<template>
  <v-sheet>
    <v-card class="card-parent d-flex justify-space-between">
      <WaterBladeTable :blades="getWaterBlades" />
    </v-card>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import WaterBladeTable from "@/components/tables/WaterBladeTable.vue";

export default {
  name: "WaterBladeView",
  data: () => ({
    plantation: {},
    showModal: false,
    dialogDelete: false,
    tableUpdate: 0,
  }),
  components: {
    WaterBladeTable,
  },
  computed: {
    ...mapGetters("plantations", ["getWaterBlades"]),
  },
};
</script>

<style>
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