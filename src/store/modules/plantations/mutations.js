const mutations = {
    addPlantation(state, item) {
        item.id = state.plantations[state.plantations.length() - 1].id + 1
        state.plantations.push(item);
    },
    editPlantation(state, item) {
        const index =  state.plantations.findIndex(object => {
            return object.id === item.id;
          });
        state.plantations[index] = item;
    }
}

export default mutations;