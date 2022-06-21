const actions = {
    createPlantation({ commit }, item) {
        commit('addPlantation', item)
    },
    editPlantation({ commit }, item) {
        commit('editPlantation', item)
    },
    deletePlantation({ commit }, item) {
        commit('deletePlantation', item)
    },
    addEstimateTime({ commit }, item) {
        commit('addEstimateTime', item)
    }
}

export default actions;