<template>
  <v-container class="text-center">
      <v-row class="mt-2 mb-n8" dense>
       <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
        <v-text-field
            :value="plantation.culture"
            readonly
            label="Cultura"
            outlined
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
        <v-text-field
            :value="plantation.copeArea"
            label="Área de copa (m²)"
            readonly
            outlined
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
        <v-text-field
            :value="plantatioArea"
            label="Área de planta (m²)"
            readonly
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
  </v-container>
</template>
<script>

export default {
  props: {
     plantation: {
       type: String,
       default: () => ""
     }
  },
  computed: {
    plantatioArea() {
      return this.plantation.betweenPlants * this.plantation.betweenLines;
    },
  },
};
</script>