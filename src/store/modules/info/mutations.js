const mutations = {
    saveWeather(state, item) {
        state.weather = item;
    },
    savePreciptation(state, item) {
        state.preciptation = item;
    },
}

export default mutations;