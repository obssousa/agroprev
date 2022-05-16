<template>
  <v-data-table
    :headers="headers"
    :items="getPlantations"
    :expanded.sync="expanded"
    :item-key="itemKey"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> {{ 'Detalhes de Plantações' }} </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-if="search"
          v-model="search"
          append-icon="mdi-magnify"
          label="Procurar"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:[`item.emissors`]="{ item }">
      <v-chip
        color="primary"
        dark
      >
        {{ item.emissors }}
      </v-chip>
    </template>
    <template v-slot:[`item.flow`]="{ item }">
      <v-chip
        color="primary"
        dark
      >
        {{ item.flow }}
      </v-chip>
    </template>
    <template v-slot:[`item.irrigationType`]="{ item }">
      <v-chip
        color="primary"
        dark
      >
        {{ item.irrigationType }}
      </v-chip>
    </template>
    <template v-slot:[`item.efficiency`]="{ item }">
      <v-chip
        color="primary"
        dark
      >
        {{ item.efficiency }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PlantationTable",
  data: () => ({
    expanded: [],
    search: "",
    headers: [
      {
        text: "Setor/Gleba/Talhão",
        align: "start",
        sortable: false,
        value: "setor",
      },
      { text: "Cultura", value: "choiceCulture" },
      { text: "Copa (m²)", value: "copeArea" },
      { text: "Espaçamento Plantas", value: "betweenPlants" },
      { text: "Espaçamento Linhas", value: "betweenLines" },
      { text: "Emissores",  value: "emissors" },
      { text: "Vazão (V/h)", value: "flow" },
      { text: "Tipo de Irrigação", value: "irrigationType" },
      { text: "Eficiência", value: "efficiency" },
    ],
  }),
  computed: {
    ...mapGetters("plantations", ["getPlantations"]),
    itemKey() {
      return this.headers[0]?.value;
    },
  },
};
</script>
<style lang="scss">
.expanded {
    padding: 0px !important;
    padding-bottom: 20px !important;
}

</style>
