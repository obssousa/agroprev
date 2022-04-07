<template>
  <v-container>
      <v-row dense>
       <v-col
          v-for="(item, i) in getCultures"
          :key="i"
          cols="12"
          lg="4"
          md="3"
          sm="2"
        >
          <v-card
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
      <CultureForm v-model="showModal" />
  </v-container>
</template>

<script>
import CultureForm from '@/components/modal/CultureForm'
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Home',
    data: () => ({
      showModal: false,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }),
    components: {
      CultureForm
    },
    computed: {
    ...mapGetters("cultures", [
        "getCultures"
    ])
  },
    methods: {
      ...mapActions([
      'createCulture',
    ]),
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
      showCultureForm() {
        this.showModal = true;
      }
    }
  }
</script>
