<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500">
      <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="show = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Cultura</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      <v-card>
        <v-container>
        <v-text-field
          label="Procurar"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
        </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
     value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  }
};
</script>