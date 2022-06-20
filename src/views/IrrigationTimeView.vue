<template>
  <v-container>
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
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-row justify="center" class="mt-6">
      <v-select
          v-model="selectedSector"
          :items="getPlantations"
          label="Setor / Gleba / Talhão"
          item-text="setor"
          item-value="id"
          outlined
          @change="getPlantationWeather()"
        ></v-select>
      <v-expansion-panels focusable>
        <v-expansion-panel v-for="(item, i) in fields" :key="i">
          <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <component :preciptation.sync="preciptation" :plantation.sync="selectedPlantation" v-bind:is="item.component"></component>
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
  </v-container>
</template>

<script>
import PlantationInfoCard from "@/components/cards/irrigation/PlantationInfoCard.vue";
import IrrigationSystemCard from "@/components/cards/irrigation/IrrigationSystemCard.vue";
import AgrometeorologicalCard from "@/components/cards/irrigation/AgrometeorologicalCard.vue";
import { mapGetters, mapActions } from "vuex";
import time from "@/hooks/time";
import irrigationTime from "@/hooks/irrigationTime";

export default {
  name: "IrrigationTimeView",
  data() {
    return {
      selectedSector: '',
      preciptation: '',
      panel: [],
      items: 5,
      toast: false,
      toastText: '',
      submit: false,
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
        {
          title: "Informações Agrometereológicas",
          component: AgrometeorologicalCard,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("plantations", ["getPlantations"]),
    ...mapGetters("info", ["getWeather"]),
    selectedPlantation() {
      return this.getPlantations.find(x => x.id === this.selectedSector);
    },
  },
  methods: {
    ...mapActions({
      calcADD: 'servagro/calcADD',
      fetchWeather: 'info/fetchWeather',
    }),
    calcEstimateTime() {
      this.loading = true;
      const temperature = this.getWeather?.temp;
      const payload = {
        today: time.getFormattedDate(time.getToday()),
        plantingDate: time.getFormattedDate(this.selectedPlantation.plantio),
        temperature: Math.round(temperature),
      }

      this.calcADD(payload)
      .then(() => {
        let irrigation = irrigationTime.calc();

        console.log(irrigation);
        
        const calc = irrigation.calc(
          this.selectedPlantation.betweenLines, 
          this.selectedPlantation.betweenPlants,
          this.selectedPlantation.emissors,
          this.selectedPlantation.flow);

      console.log(calc);
    
      })
      .finally(() => { this.loading = false; });
    },
    async getPlantationWeather() {
      const payload = {
        lat: this.selectedPlantation.location.latitude,
        lon: this.selectedPlantation.location.longitude,
        today: time.getToday() / 1000,
      }

      await this.fetchWeather(payload)
      .then(this.submit = true)
      .catch((err) => {
          this.submit = false;
          this.toast = true;
          this.toastText = `${err.message} - ${err.response.data.message}`;
      });
    }
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
