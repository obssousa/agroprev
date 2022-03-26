<template>
  <v-app>
    <DesktopNavigation v-if="!$vuetify.breakpoint.mdAndDown" />
    <MobileNavigation v-else />
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
import MobileNavigation from "@/components/Navigation/MobileNavigation"

export default {
  components: { DesktopNavigation, MobileNavigation },
  name: "App",

  data: () => ({ }),
};
</script>
