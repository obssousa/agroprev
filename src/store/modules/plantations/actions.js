const actions = {
    createPlantation({ commit }, item) {
        commit('addPlantation', item)
    }
}

export default actions;