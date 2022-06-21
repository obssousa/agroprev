const mutations = {
    saveDailyModel(state, item) {
        state.dailyModel = item;
    },
    saveInterpolation(state, item) {
        state.interpolation = item;
    },
    saveADD(state, item) {
        state.add = item;
    },
    saveEvoTranspiration(state, item) {
        state.evoTranspiration = item;
    },
}

export default mutations;