<template>
  <v-app>
    <DesktopNavigation v-if="!$vuetify.breakpoint.mdAndDown" />
    <MobileNavigation v-else />
    <v-main>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import DesktopNavigation from "@/components/Navigation/DesktopNavigation";
import MobileNavigation from "@/components/Navigation/MobileNavigation"

export default {
  components: { DesktopNavigation, MobileNavigation },
  computed: {
    ...mapGetters("user", ["getTheme"]),
  },
  name: "App",

  data: () => ({ }),
  created() {
    this.$vuetify.theme.dark = this.getTheme;
  }
};
</script>
