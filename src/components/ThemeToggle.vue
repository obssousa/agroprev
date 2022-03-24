<template>
  <div>
    <div v-if="!$vuetify.theme.dark">
      <v-btn transition="scale-transition" origin="center center" color="secondary" small fab @click="darkMode">
        <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
      </v-btn>
      <span class="text--text pl-3">Modo Noturno</span>
    </div>
    <div v-else>
      <v-btn transition="scale-transition" origin="center center" color="accent" small fab @click="darkMode">
        <v-icon>mdi-white-balance-sunny</v-icon>
      </v-btn>
      <span class="text--text pl-3">Modo Claro</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThemeToggle",
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
