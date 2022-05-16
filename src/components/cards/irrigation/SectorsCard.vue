<template>
  <div class="text-center">
      <v-row dense>
       <v-col
          v-for="(item, i) in getCultures"
          :key="i"
          cols="12"
          xl="2"
          lg="3"
          md="4"
          sm="6"
        >
          <v-card
            class="culture-card"
            :color="getColorByValue(item.coefficient)"
            @click="showCultureForm(item)"
            dark
          >
            <div class="d-flex flex-no-wrap flex-column justify-space-between">
                <v-card-title
                  class="text-h5 black--text"
                  v-text="item.name"
                ></v-card-title>

                <v-card-subtitle class="black--text" v-text="item.coefficient"></v-card-subtitle>
              </div>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
     value: Boolean
  },
  computed: {
    ...mapGetters("cultures", [
        "getCultures"
    ]),
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  },
  methods: {
      getColorByValue(coefficient) {
        if(coefficient <= 30)
          return '#FFEB3B';

        if(coefficient <= 40)
          return '#FBC02D';

        if(coefficient <= 50)
          return '#FF6F00';

        if(coefficient <= 60)
          return '#FF7043';
        
        if(coefficient <= 70)
          return '#E64A19';

        if(coefficient <= 80)
          return '#BF360C';
      },
  }
};
</script>