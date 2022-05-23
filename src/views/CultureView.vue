<template>
  <v-container>
    <v-row class="d-flex justify-center" dense>
      <v-card
        v-for="(item, i) in getCultures"
        :key="i"
        class="culture-card ma-2"
        width="270px"
        color="accent"
      >
        <v-img height="200" :src="item.image"></v-img>
        <div class="d-flex flex-no-wrap flex-column justify-space-between">
          <v-card-title
            :class="$vuetify.theme.dark ? 'text-h5 black--text' : 'text-h5 white--text'"
            v-text="item.name"
          ></v-card-title>

          <v-divider :color="$vuetify.theme.dark ? 'primary' : 'accent'" class="mx-4"></v-divider>

          <v-card-text>
              <v-chip :class="$vuetify.theme.dark ? 'elevation-3 black--text' : 'elevation-3 white--text'" :color="$vuetify.theme.dark ? 'text' : 'primary'">Coeficiente: {{ item.coefficient }} </v-chip>
          </v-card-text>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data: () => ({
    showModal: false,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  computed: {
    ...mapGetters("cultures", ["getCultures"]),
  },
  methods: {
    ...mapActions({
      createCulture: "cultures/createCulture",
    }),
  },
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
.v-btn--example {
  right: 0;
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}

.card-parent {
}

.culture-card {
  width: 300px;
}
</style>