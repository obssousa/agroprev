<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Cadastro de Plantio</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="savePlantation"> Salvar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card-title class="mb-n10">Sistema de Plantio</v-card-title>
          <v-list three-line subheader>
            <v-row class="mb-3">
              <v-col
                v-for="item in plantingSystem"
                :key="item.title"
                cols="12"
                sm="12"
                md="4"
              >
                <v-list-item class="mb-n10">
                  <v-list-item-content>
                    <v-text-field
                      v-if="item.id !== 'culture'"
                      v-model="item.value"
                      :rules="rules"
                      :type="item.type"
                      :label="item.title"
                    ></v-text-field>
                    <v-select
                      v-model="item.value"
                      v-if="item.id === 'culture'"
                      :items="getCultures"
                      item-text="name"
                      :label="item.title"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-subheader><h3>Distâncias</h3></v-subheader>
            <v-row>
              <v-col
                v-for="item in plantingDistance"
                :key="item.title"
                cols="12"
                sm="12"
                md="4"
              >
                <v-list-item class="mb-n10">
                  <v-list-item-content>
                    <v-text-field
                      v-if="item.id"
                      v-model="item.value"
                      :rules="rules"
                      :type="item.type"
                      :label="item.title"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-list>
          <v-divider class="mt-10"></v-divider>
          <v-card-title class="mb-n10 mt-5">Sistema de Irrigação</v-card-title>
          <v-list three-line subheader>
            <v-row>
              <v-col
                v-for="item in irrigationSystem"
                :key="item.title"
                cols="12"
                sm="12"
                md="4"
              >
                <v-list-item class="mb-n10">
                  <v-list-item-content>
                    <v-text-field
                      v-if="item.id !== 'irrigationType'"
                      v-model="item.value"
                      :rules="rules"
                      :type="item.type"
                      :label="item.title"
                    ></v-text-field>
                    <v-select
                      v-model="item.value"
                      v-if="item.id === 'irrigationType'"
                      :items="PlantationTypes"
                      :label="item.title"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-list>
          <v-divider class="mt-10"></v-divider>
          <v-card-title>Localização</v-card-title>
          <v-card-subtitle>Selecione a localização do seu plantio</v-card-subtitle>
          <v-card
            class="d-flex justify-space-around mb-6 mr-4 ml-4"
            flat
            tile
          >
            <GmapMap
              :center="locationData.center"
              :zoom="8"
              map-type-id="terrain"
              style="googleMaps"
              @click="handleMapClick"
            >
              <GmapMarker
                :position="locationData.marker.position"
                :clickable="true"
                :draggable="true"
                @drag="handleMarkerDrag"
                @click="panToMarker"
              />
            </GmapMap>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import PlantationTypes from "@/constants/irrigationType";

export default {
  data() {
    return {
      title: "Cadastro de Novo Plantio",
      plantingSystem: [
        {
          title: "Setor, Gleba ou Talhão",
          id: "setor",
          value: "",
          type: "text",
        },
        {
          title: "Cultura",
          id: "culture",
          value: "",
        },
        {
          id: "copeArea",
          title: "Área de Copa (m²)",
          value: "",
          type: "number",
        },
      ],
      plantingDistance: [
        {
          id: "betweenPlants",
          title: "Entre Plantas (m)",
          value: "",
          type: "number",
        },
        {
          id: "betweenLines",
          title: "Entre Linhas (m)",
          value: "",
          type: "number",
        },
      ],
      irrigationSystem: [
        {
          id: "emissors",
          title: "Quantidade de emissores",
          value: "",
          type: "number",
        },
        {
          id: "flow",
          title: "Vazão de emissor (L/h)",
          value: "",
          type: "number",
        },
        {
          id: "irrigationType",
          title: "Selecione um tipo de irrigação:",
          value: "",
        },
        {
          id: "efficiency",
          title: "Eficiência (%)",
          value: "",
          type: "number",
        },
      ],
      locationData: {
        marker: { position: { lat: -8.05428, lng: -34.8813 } },
        center: { lat: -8.05428, lng: -34.8813 },
      },
      rules: [
        value => !!value || 'Required.',
      ],
      PlantationTypes,
    };
  },
  props: {
    value: Boolean,
  },
  computed: {
    ...mapGetters("cultures", ["getCultures"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions({
      createPlantation: "plantations/createPlantation",
    }),
    savePlantation() {
      let formData = {};
      let location = { latitude: this.locationData.marker.position.lat, longitude: this.locationData.marker.position.lng };
      let allData = this.plantingSystem.concat(this.plantingDistance, this.irrigationSystem);

      console.log(allData);
      console.log(location);

      allData.forEach((question) => {
        formData[question.id] = question.value;
      });

      formData.location = location;

      console.log(formData);

      this.createPlantation(formData);
      this.$emit("close");
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.panToMarker();
      });
    },
    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },
    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      this.$refs.mapRef.setZoom(18);
    },
    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    },
  },
};
</script>
<style>

.vue-map-container {
  width: 1980px;
  height: 400px;
}

</style>