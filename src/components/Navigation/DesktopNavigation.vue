<template>
  <v-navigation-drawer floating permanent app class="green darken-1" dark>
    <v-list dense rounded>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <div class="d-flex flex-column align-center text-center p">
        <h5 class="text--text overline">Desenvolvido em:</h5>
        <v-img width="30%" src="@/assets/UFPA.png"></v-img>
        <ThemeToggle title class="pa-4" />
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import ThemeToggle from "@/components/ThemeToggle.vue";
export default {
  components: { ThemeToggle },
  name: "DesktopNavigation",
  data() {
    return {
      items: [
        { title: "Plantios", icon: "mdi-view-dashboard", route: "/" },
        { title: "Culturas", icon: "mdi-forest", route: "/culture" },
        {
          title: "Estimativa de Irrigação",
          icon: "mdi-sprinkler-variant",
          route: "/irrigation",
        },
        {
          title: "Lâminas de Irrigação",
          icon: "mdi-water-check",
          route: "/blade",
        },
        { title: "Sobre", icon: "mdi-information", route: "/about" },
      ],
    };
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
