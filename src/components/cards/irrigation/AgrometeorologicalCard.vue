<template>
  <v-container class="text-center">
    <v-row class="mt-2 mb-n8" dense>
      <v-col cols="12" lg="3" md="4" sm="6">
        <div class="d-flex align-center">
        <v-text-field
          v-model="value"
          @input="$emit('update:preciptation', value), $emit('update:rules', rules);"
          :rules="rules"
          label="Precipitação (mm)"
          outlined
        ></v-text-field>
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
      value: '',
      rules: [
        value => !!value || 'Obrigatório.',
      ],
    }
  }
};
</script>