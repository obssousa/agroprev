const actions = {
    createCulture({ commit, item }) {
        commit('addCulture', item)
    }
}

export default actions;