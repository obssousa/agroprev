<template>
  <v-container>
    <v-card class="card-parent">
      <PlantationTable />
      <PlantationForm v-model="showModal" @close="showModal = false" />
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
  </v-container>
</template>

<script>
import PlantationForm from "@/components/modal/PlantationForm.vue";
import PlantationTable from "@/components/tables/PlantationTable.vue";

export default {
  name: "Home",
  data: () => ({
    showModal: false,
  }),
  components: {
    PlantationForm,
    PlantationTable,
  },
  methods: {
    showCultureForm() {
      this.showModal = true;
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

.card-parent {
}

.culture-card {
  width: 300px;
}
</style>