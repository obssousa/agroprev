<template>
  <v-app>
    <DesktopNavigation />
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

  data: () => ({
    //
  }),
};
</script>
