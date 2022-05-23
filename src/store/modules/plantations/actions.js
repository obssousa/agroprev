const actions = {
    createPlantation({ commit }, item) {
        commit('addPlantation', item)
    },
    editPlantation({ commit }, item) {
        commit('editPlantation', item)
    }
}

export default actions;