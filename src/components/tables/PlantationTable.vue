<template>
  <v-data-table
    class="plantationTable"
    :headers="headers"
    :items="plantations"
    :expanded.sync="expanded"
    show-expand
    :search="search"
  >
    <template v-slot:top>
        <v-row>
          <v-col cols="12" sm="12" md="6" class="d-none d-md-block">
            <h3 class="ml-4 mt-4"> {{ "Histórico de Irrigação" }} </h3>
          </v-col>
          <v-col cols="12" sm="12" md="6" class="d-md-none text-center">
            <h3 class="mt-4"> {{ "Histórico de Irrigação" }} </h3>
          </v-col>
          <v-col class="d-none d-md-block text-right">
            <v-spacer class="d-none d-md-block"></v-spacer>
            <v-btn @click="$emit('openModal')" class="mt-md-3 mr-md-4" rounded color="primary">
              Cadastra novo plantio
              <v-icon right> mdi-plus-circle </v-icon>
            </v-btn>
          </v-col>
          <v-col class="d-md-none text-center">
            <v-btn @click="$emit('openModal')" class="mt-md-3 mr-md-2" rounded color="primary">
              Cadastra novo plantio
              <v-icon right> mdi-plus-circle </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      <v-text-field
          v-model="search"
          label="Procurar"
          class="mx-4"
        ></v-text-field>
    </template>
    <template v-slot:[`item.efficiency`]="{ item }">
      {{ item.efficiency * 100 }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td class="expanded-td" :colspan="headers.length">
        <v-container fluid>
            <GmapMap
              :center="getLocation(item.location)"
              :zoom="8"
              map-type-id="terrain"
            >
              <GmapMarker
                :position="getLocation(item.location)"
                :clickable="false"
                :draggable="false"
              />
            </GmapMap>
        </v-container>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
     plantations: {
       type: Array,
       default: () => []
     }
  },
  name: "PlantationTable",
  data: () => ({
    max25chars: (v) => v.length <= 25 || "Input too long!",
    expanded: [],
    search: "",
    headers: [
      {
        text: "Setor/Gleba/Talhão",
        align: "start",
        sortable: false,
        value: "setor",
      },
      { text: "Data de Plantio", value: "plantio" },
      { text: "Cultura", value: "culture" },
      { text: "Copa (m²)", value: "copeArea" },
      { text: "Espaçamento Plantas (m)", value: "betweenPlants" },
      { text: "Espaçamento Linhas (m)", value: "betweenLines" },
      { text: "Emissores", value: "emissors" },
      { text: "Vazão (L/h)", value: "flow" },
      { text: "Tipo de Irrigação", value: "irrigationType" },
      { text: "Eficiência (%)", value: "efficiency" },
      { text: '', value: 'actions', sortable: false },
    ],
  }),
  
  // created() {
  //   this.$refs.gmap.clientWidth = this.headers.length;
  // },
  methods: {
    editItem(item) {
      this.$emit('editItem', item);
    },
    deleteItem(item) {
      this.$emit('deleteItem', item);
    },
    getLocation(item) {
        return { lat: item.latitude, lng: item.longitude };
    },
  },
};
</script>
<style lang="scss">

.plantationTable {
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
