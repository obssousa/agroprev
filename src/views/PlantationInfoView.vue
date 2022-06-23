<template>
  <v-sheet>
    <v-card class="card-parent d-flex justify-space-between">
      <PlantationTable :plantations="getPlantations" @editItem="editItem" @deleteItem="openDeleteDialog" :key="tableUpdate" />
      <PlantationForm v-if="showModal" v-model="showModal" :plantation="plantation" @close="forceUpdateTable" />
    </v-card>
    <v-fab-transition>
      <v-btn
        fab
        large
        @click="showCultureForm()"
        color="primary"
        bottom
        left
        class="v-btn--example mr-3"
      >
        <v-icon>{{ "mdi-plus" }}</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>Apagar plantação</v-card-title>
        <v-card-text>Apagar uma plantação não pode ser revertido, tens certeza?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialogDelete = false">CANCELAR</v-btn>
          <v-btn color="primary" text @click="deleteItem(plantation)">APAGAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PlantationForm from "@/components/modal/PlantationForm.vue";
import PlantationTable from "@/components/tables/PlantationTable.vue";

export default {
  name: "PlantationInfoView",
  data: () => ({
    plantation: {},
    showModal: false,
    dialogDelete: false,
    tableUpdate: 0,
  }),
  components: {
    PlantationForm,
    PlantationTable,
  },
  computed: {
    ...mapGetters("plantations", ["getPlantations"]),
  },
  methods: {
    ...mapActions({
      deletePlantation: "plantations/deletePlantation",
    }),
    showCultureForm() {
      this.plantation = {};
      this.showModal = true;
    },
    editItem(item) {
      this.plantation = item;
      this.showModal = true;  
    },
    openDeleteDialog(item) {
      this.plantation = item;
      this.dialogDelete = true;
    },
    forceUpdateTable() {
      this.tableUpdate += 1;
      this.showModal = false;  
    },
    deleteItem(item) {
      this.deletePlantation(item).finally(this.dialogDelete = false);
    },
  },
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
.v-btn--example {
  right: 0;
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}

.culture-card {
  width: 300px;
}
</style>