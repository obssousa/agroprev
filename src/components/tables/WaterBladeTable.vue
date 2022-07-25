<template>
  <v-data-table
    class="bladeTable"
    :headers="headers"
    :items="blades"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> {{ "Histórico de Lâminas de Irrigação" }} </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-text-field
          v-model="search"
          label="Procurar"
          class="mx-4" />
    </template>
    <template v-slot:[`item.estimative`]="{ item }">
      {{ hoursConverter(item.estimative) }}
    </template>
    <template v-slot:[`item.plantationDate`]="{ item }">
      {{ getUsuallyDate(item.plantationDate) }}
    </template>
    <template v-slot:[`item.startDate`]="{ item }">
      {{ getUsuallyDate(item.startDate) }}
    </template>
  </v-data-table>
</template>

<script>
import time from "@/hooks/time"
export default {
  props: {
     blades: {
       type: Array,
       default: () => []
     }
  },
  name: "WaterBladeTable",
  data: () => ({
    expanded: [],
    search: "",
    headers: [
      {
        text: "Plantação",
        align: "start",
        sortable: false,
        value: "plantation",
      },
      {
        text: "Data de Estimativa",
        value: "startDate",
      },
      { text: "Data de Plantio", value: "plantationDate" },
      { text: "Evapotranspiração", value: "evapotranspiration" },
      { text: "Precipitação (mm)", value: "preciptation" },
      { text: "Estimativa Diária", value: "estimative" },
    ],
  }),
  methods: {
    hoursConverter(hour) {
      return time.hoursConverter(hour);
    },
    getUsuallyDate(period) {
      const date = new Date(period);
      date.setMonth(date.getMonth(), date.getDate());
      const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      let day = date.getDate().toString().padStart(2,0);
      let month = months[date.getMonth()];
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
}
</script>
<style lang="scss">

.bladeTable {
  width: -webkit-fill-available;

  table {
    width: fit-content;
  }

  .expanded-td {
    padding: 0px !important;
    padding-right: 100px;
    padding-bottom: 20px !important;
    white-space: nowrap !important;
    width: 1% !important;
  }
}
.vue-map-container {
  width: auto;
  height: 400px;
}
</style>
