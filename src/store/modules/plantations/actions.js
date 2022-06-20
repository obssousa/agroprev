const actions = {
    createPlantation({ commit }, item) {
        commit('addPlantation', item)
    },
    editPlantation({ commit }, item) {
        commit('editPlantation', item)
    },
    deletePlantation({ commit }, item) {
        commit('deletePlantation', item)
    }
}

export default actions;