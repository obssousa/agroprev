const mutations = {
    saveWeather(state, item) {
        state.weather = item;
    },
    saveSolar(state, item) {
        state.solar = item;
    },
}

export default mutations;