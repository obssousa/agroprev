import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#006e17',
          secondary: '#52634f',
          accent: '#38656a',
          success: '#8E24AA',
          error: '#ba1b1b',
          text: '#FFFFFF'
        },
        dark: {
            primary: '#78dc77',
            secondary: '#b9ccb3',
            accent: '#a1cfd5',
            success: '#8E24AA',
            error: '#ffb4a9',
            text: '#FFFFFF'
        },
      },
    },
  })

export default vuetify;
