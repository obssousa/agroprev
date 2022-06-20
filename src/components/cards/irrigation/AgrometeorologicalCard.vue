<template>
  <v-container class="text-center">
    <v-row class="mt-2 mb-n8" dense>
      <v-col cols="12" lg="3" md="4" sm="6">
        <div class="d-flex align-center">
        <v-text-field
          v-model="value"
          @input="$emit('update:preciptation', value);"
          :readonly="!editing"
          label="Precipitação (mm)"
          outlined
        ></v-text-field>
        <v-btn
          class="d-flex mt-n7 ml-4"
          @click="editing = !editing"
          fab
          small
          color="accent"
        >
          <v-icon dark>
            {{ editing ? 'mdi-check' : 'mdi-pencil' }} 
          </v-icon>
        </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
     plantation: {
       type: Object,
       default: () => ({})
     }
  },
  data() {
    return {
      editing: false,
      value: '',
    }
  }
};
</script>