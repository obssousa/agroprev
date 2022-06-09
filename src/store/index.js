import Vue from 'vue'
import Vuex from 'vuex'
import Cultures from '@/store/modules/cultures'
import Plantations from '@/store/modules/plantations'
import Info from '@/store/modules/info'
import Servagro from '@/store/modules/servagro'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cultures: Cultures,
    plantations: Plantations,
    info: Info,
    servagro: Servagro

  }
})
