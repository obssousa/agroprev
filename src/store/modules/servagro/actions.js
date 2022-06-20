import axios from 'axios';

const actions = {
    fetchDailyModel({ commit }, item) {
        commit('saveDailyModel', item);
    },
    createInterpolation({ commit }, payload) {
        const url = '/interpolacao/' + payload.latitude + '/' + payload.longitude
            + '/' + payload.data;
        axios.get(url)
            .then((data) => {
                commit('saveInterpolation', data);
                return data;
            })
            .catch((err) => {
                return err;
            })
    },
    calcADD({ commit }, payload) {
        const url = 'https://shrouded-badlands-78358.herokuapp.com/https://servagro2.augustobrandao.repl.co/add/' + payload.temperature + '/' + payload.plantingDate
            + '/' + payload.today + '/';
        return new Promise((resolve, reject) => {
            axios.get(url)
            .then((data) => {
                commit('saveADD', data.data);
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    },
    createDailyModel({ commit }, payload) {
        const url = '/modelo/' + payload;
        return new Promise((resolve, reject) => {
            axios.post(url)
                .then((data) => {
                    commit('saveADD', data);
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
}

export default actions;