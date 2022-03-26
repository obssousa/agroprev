<template>
  <v-app>
    <DesktopNavigation v-if="!$vuetify.breakpoint.mdAndDown" />
    <v-content>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DesktopNavigation from "@/components/Navigation/DesktopNavigation";

export default {
  components: { DesktopNavigation },
  name: "App",

  data: () => ({ isMobile: false }),

  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },

  mounted() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
};
</script>
