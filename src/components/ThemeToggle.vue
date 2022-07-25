<template>
  <div>
    <div v-if="!$vuetify.theme.dark">
      <v-btn
        :elevation="title ? '4' : '0'"
        transition="scale-transition"
        origin="center center"
        :color="title ? 'secondary' : 'transparent'"
        small
        fab
        @click="darkMode"
      >
        <v-icon color="grey darken-4" class="mr-1">mdi-moon-waxing-crescent</v-icon>
      </v-btn>
      <span v-if="title" class="text--text pl-3">Modo Noturno</span>
    </div>
    <div v-else>
      <v-btn
        :elevation="title ? '4' : '0'"
        transition="scale-transition"
        origin="center center"
        :color="title ? 'secondary' : 'transparent'"
        small
        fab
        @click="darkMode"
      >
        <v-icon color="yellow lighten-1">mdi-white-balance-sunny</v-icon>
      </v-btn>
      <span v-if="title" class="text--text pl-3">Modo Claro</span>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "ThemeToggle",
  props: {
    title: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions({
      saveTheme: "user/saveTheme",
    }),
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.saveTheme(this.$vuetify.theme.dark);
    },
  },
};
</script>
