const getters = {
    getDailyModel(state) {
        return state.dailyModel
    },
    getInterpolation(state) {
        return state.interpolation
    },
    getADD(state) {
        return state.add
    },
    getEvoTranspiration(state) {
        return state.evoTranspiration
    }
}

export default getters