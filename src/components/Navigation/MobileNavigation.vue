<template>
<div>
    <v-app-bar
      class="green darken-1" dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <ThemeToggle />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      class="green darken-1"
      dark >
    <v-list dense nav rounded>
      <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--text"
        >
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
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</div>
</template>
<script>
import ThemeToggle from "@/components/ThemeToggle.vue";
export default {
  components: { ThemeToggle },
  name: "MobileNavigation",
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
          title: "Histórico de Irrigação",
          icon: "mdi-water-check",
          route: "/blade",
        },
        { title: "Sobre", icon: "mdi-information", route: "/about" },
      ],
      drawer: false,
      group: null,
    };
  },
  watch: {
      group () {
        this.drawer = false
      },
    },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
