<template>
  <v-data-table
    :headers="headers"
    :items="getPlantations"
    :item-key="itemKey"
    :expanded.sync="expanded"
    show-expand
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> {{ "Detalhes de Plantações" }} </v-toolbar-title>
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
      <td :colspan="headers.length">
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
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
      { text: "Cultura", value: "culture" },
      { text: "Copa (m²)", value: "copeArea" },
      { text: "Espaçamento Plantas", value: "betweenPlants" },
      { text: "Espaçamento Linhas", value: "betweenLines" },
      { text: "Emissores", value: "emissors" },
      { text: "Vazão (V/h)", value: "flow" },
      { text: "Tipo de Irrigação", value: "irrigationType" },
      { text: "Eficiência", value: "efficiency" },
      { text: '', value: 'actions', sortable: false },
    ],
  }),
  computed: {
    ...mapGetters("plantations", ["getPlantations"]),
    itemKey() {
      return this.headers[0]?.value;
    },
  },
  created() {
    this.$refs.gmap.clientWidth = this.headers.length;
  },
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
table {
  width: fit-content;
}
td:last-child {
  padding: 0px !important;
  padding-right: 100px;
  padding-bottom: 20px !important;
}
.vue-map-container {
  width: auto;
  height: 400px;
}
</style>
