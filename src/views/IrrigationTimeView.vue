<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
    >
    <v-snackbar
      centered
      v-model="toast"
      :timeout="5000"
      :value="true"
      absolute
      right
      top
      tile
      color="red accent-2"
    >
      {{ toastText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          fab
          text
          small
          v-bind="attrs"
          @click="toast = false"
        >
          <v-icon dark> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-row justify="center" class="mt-6">
      <v-select
        v-model="selectedSector"
        :items="getPlantations"
        label="Plantio"
        item-text="setor"
        item-value="id"
        :rules="[(v) => !!v || 'Selecione uma plantação']"
        outlined
        return-object
        @change="getPlantationWeather()"
      ></v-select>
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="(item, i) in fields" :key="i">
          <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <component
              :evapotranspiration.sync="evapotranspiration"
              :rules.sync="rules"
              :plantation.sync="selectedPlantation"
              v-bind:is="item.component"
            ></component>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels  v-model="panel" readonly multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>{{ 'Informação Meterológica' }}</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-container class="text-center">
            <v-row class="mb-n8" dense>
              <v-col cols="12" lg="3" md="4" sm="6">
                <div class="d-flex align-center">
                <v-text-field
                  v-model="preciptation"
                  :rules="rules"
                  label="Preciptação (mm)"
                  outlined
                ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-btn
        class="ma-2 mt-6"
        :loading="loading"
        :disabled="!submit"
        color="info"
        @click="calcEstimateTime()"
      >
        Calcular tempo de irrigação
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
    </v-row>
    <v-dialog v-model="showSuccess" max-width="500px">
      <v-card>
        <v-card-title>Lâmina calculada com sucesso</v-card-title>
        <v-card-text>Estimativa de {{ hoursConverter(waterBlade) }}</v-card-text>
        <v-card-text>O historico pode ser consultado na seção de Lâminas de Irrigação</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="showSuccess = false">Entendido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
  </v-container>
</template>

<script>
import PlantationInfoCard from "@/components/cards/irrigation/PlantationInfoCard.vue";
import IrrigationSystemCard from "@/components/cards/irrigation/IrrigationSystemCard.vue";
import { mapGetters, mapActions } from "vuex";
import time from "@/hooks/time";
import irrigationTime from "@/hooks/irrigationTime";
import kcCalc from "@/hooks/kc";
import eToCalc from "@/hooks/eto";
import probabilitySuccess from "@/hooks/probabilitySuccess";

export default {
  name: "IrrigationTimeView",
  data() {
    return {
      selectedSector: "",
      evapotranspiration: "",
      preciptation: "",
      showSuccess: false,
      waterBlade: 0,
      valid: false,
      panel: [0],
      items: 5,
      toast: false,
      toastText: "",
      submit: true,
      loading: false,
      fields: [
        {
          title: "Informações de Plantio",
          component: PlantationInfoCard,
        },
        {
          title: "Sistema de Irrigação",
          component: IrrigationSystemCard,
        },
      ],
      rules: [
        value => !!value || 'Item obrigatório.',
      ],
    };
  },
  computed: {
    ...mapGetters("plantations", ["getPlantations"]),
    ...mapGetters("cultures", ["getCultures"]),
    ...mapGetters("info", ["getWeather", "getSolar"]),
    selectedPlantation() {
      return this.getPlantations.find((x) => x.id === this.selectedSector.id);
    },
  },
  methods: {
    ...mapActions({
      calcADD: "servagro/calcADD",
      addEstimateTime: "plantations/addEstimateTime",
      fetchWeather: "info/fetchWeather",
      fetchSolarData: "info/fetchSolarData",
    }),
    getCultureType(name) {
      return this.getCultures.find((culture) => culture.name === name).type;
    },
    async calcEstimateTime() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const temperature = this.getWeather?.main.temp;
        const payload = {
          today: time.getFormattedDate(time.getToday()),
          plantingDate: time.getFormattedDate(this.selectedPlantation.plantio),
          temperature: Math.round(temperature),
        };

        await this.calcADD(payload)
          .then((res) => {
            const plantation = this.selectedPlantation;
            const kc = kcCalc(
              this.getCultureType(this.selectedPlantation.culture),
              res
            );
            probabilitySuccess(
              plantation.betweenLines * plantation.betweenPlants
            );
            this.waterBlade = irrigationTime(
              plantation.betweenLines,
              plantation.betweenPlants,
              plantation.emissors,
              plantation.flow,
              plantation.betweenLines * plantation.betweenPlants,
              this.evapotranspiration,
              kc,
              plantation.copeArea,
              plantation.efficiency,
              this.preciptation,
            );
          })
          .finally(() => {
            this.loading = false;
          });

        await this.addEstimateTime({
            plantation: this.selectedPlantation.setor,
            estimative: this.waterBlade,
            startDate: time.getToday(),
            plantationDate: this.selectedPlantation.plantio,
            evapotranspiration: this.evapotranspiration,
            preciptation: this.preciptation,
          }).then(() => {
            this.showSuccess = true;
          });
      }
    },
    async getPlantationWeather() {
      this.submit = false;
      const payload = {
        lat: this.selectedPlantation.location.latitude,
        lon: this.selectedPlantation.location.longitude,
        today: time.getToday() / 1000,
      };

      await this.fetchWeather(payload)
        .catch((err) => {
          this.submit = false;
          this.toast = true;
          this.toastText = `${err.message} - ${err.response.data.message}`;
        });

      await this.fetchSolarData(payload)
        .then(() => {
          const temperature = this.getWeather?.main.temp;
          const minTemperature = this.getWeather?.main.temp_min;
          const maxTemperature = this.getWeather?.main.temp_max;
          const eTO = eToCalc(this.getSolar?.solarradiation, temperature, maxTemperature, minTemperature);
          this.evapotranspiration = eTO;
          this.preciptation = this.getSolar?.precip * 25.4;
          this.submit = true;
        })
        .catch((err) => {
          this.submit = false;
          this.toast = true;
          this.toastText = `${err.message} - ${err.response.data.message}`;
        });
    },
    hoursConverter(hour) {
      return time.hoursConverter(hour);
    },
  },
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
