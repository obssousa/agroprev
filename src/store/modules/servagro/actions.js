import axios from 'axios';

const actions = {
    fetchDailyModel({ commit }, item) {
        commit('saveDailyModel', item);
    },
    createInterpolation({ commit }, payload) {
        const url = 'https://shrouded-badlands-78358.herokuapp.com/https://servagro2.augustobrandao.repl.co/interpolacao/' + payload.lat + '/' + payload.lon
            + '/' + payload.today;
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((data) => {
                    commit('saveInterpolation', data.data);
                    resolve(data.data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    calcADD({ commit }, payload) { 
        const url = 'https://shrouded-badlands-78358.herokuapp.com/https://servagro2.augustobrandao.repl.co/add/' + payload.temperature + '/' + payload.plantingDate
            + '/' + payload.today + '/';
        return new Promise((resolve, reject) => {
            axios.get(url)
            .then((data) => {
                commit('saveADD', data.data);
                resolve(data.data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    },
}

export default actions;