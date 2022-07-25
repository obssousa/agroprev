const actions = {
    saveTheme({ commit }, item) {
        commit('changeTheme', item)
    }
}

export default actions;