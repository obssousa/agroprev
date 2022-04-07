import Vue from 'vue'
import Vuex from 'vuex'
import Cultures from '@/store/modules/cultures'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cultures: Cultures,
  }
})
