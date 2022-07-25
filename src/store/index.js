import Vue from 'vue'
import Vuex from 'vuex'
import Cultures from '@/store/modules/cultures'
import Plantations from '@/store/modules/plantations'
import Info from '@/store/modules/info'
import Servagro from '@/store/modules/servagro'
import createPersistedState from "vuex-persistedstate";
import user from './modules/user'
// import Cookies from "js-cookie";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cultures: Cultures,
    plantations: Plantations,
    info: Info,
    servagro: Servagro,
    user: user,
  },
  plugins: [createPersistedState()],
})
