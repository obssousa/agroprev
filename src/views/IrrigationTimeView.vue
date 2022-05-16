<template>
  <v-container>
    <v-row justify="center">
      <v-select
          v-model="selectedSector"
          :items="getPlantations"
          label="Setor / Gleba / Talhão"
          item-text="setor"
          outlined
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
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        color="info"
        @click="loader()"
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
import { mapGetters } from "vuex";

export default {
  name: "IrrigationTimeView",
  data() {
    return {
      selectedSector: '',
      preciptation: '',
      panel: [],
      items: 5,
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
    selectedPlantation() {
      return this.getPlantations.find(x => x.setor === this.selectedSector);
    },
  },
  methods: {
    loader() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 3000);
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
