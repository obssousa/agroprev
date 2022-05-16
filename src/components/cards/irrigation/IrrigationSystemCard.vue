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
            :value="plantation.irrigationType"
            readonly
            label="Tipo"
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
            :value="plantation.emissors"
            readonly
            label="Número de Emissores"
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
            :value="plantation.flow"
            readonly
            label="Vazão do emissor (L/h)"
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
            :value="plantation.efficiency"
            readonly
            label="Eficiência"
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