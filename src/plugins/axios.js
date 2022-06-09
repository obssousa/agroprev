import Vue from 'vue';
import axios from 'axios'

axios.defaults.baseURL = 'https://servagro2.augustobrandao.repl.co/';

const api = axios.create({
    timeout: 5000
});

Vue.prototype.$http = api;
Vue.prototype.$axios = api;

export default api