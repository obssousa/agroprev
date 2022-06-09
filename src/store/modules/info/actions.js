import axios from '@/plugins/axios';
const actions = {
    fetchWeather({ commit }, payload) {
        const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${payload.lat}&lon=${payload.lon}&dt=${payload.today}&units=metric&appid=eac4e7da63feb43dc6a36871b22fd4ed`;
        return new Promise((resolve, reject) => {
        axios.get(url)
            .then((data) => {
                commit('saveWeather', data.data.current);
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    fetchPreciptation({ commit }, payload) {
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&appid=b4460409162d004303a88a627047f9d0`;
        return new Promise((resolve, reject) => {
        axios.get(url)
            .then((data) => {
                commit('savePreciptation', data.data.current);
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

export default actions;