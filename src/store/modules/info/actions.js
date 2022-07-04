import axios from '@/plugins/axios';
const actions = {
    fetchWeather({ commit }, payload) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&dt=${payload.today}&units=metric&appid=eac4e7da63feb43dc6a36871b22fd4ed`;
        return new Promise((resolve, reject) => {
        axios.get(url)
            .then((data) => {
                commit('saveWeather', data.data.list[0]);
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    fetchSolarData({ commit }, payload) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${payload.lat},${payload.lon}?key=BCHJ85RPN2ETCSJM2MD6P5PU4`;
        return new Promise((resolve, reject) => {
        axios.get(url)
            .then((data) => {
                commit('saveSolar', data.data.days[0]);
                resolve(data.data.days[0])
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
}

export default actions;