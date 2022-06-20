import axios from 'axios';
import fetchJsonp from 'fetch-jsonp'; 
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
        const url = 'https://servagro2.augustobrandao.repl.co/add/' + payload.temperature + '/' + payload.plantingDate
            + '/' + payload.today;
        return new Promise((resolve, reject) => {
            fetchJsonp(url, {
                method: 'POST',
                mode: 'no-cors',
                credentials: 'include',
                timeout: 60000,
              })
              .then(res => { 
                  res.json()
                  commit('saveADD', res.json()); 
                })
              .then(json => resolve(json))
              .catch(res => reject(res));
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