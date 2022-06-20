const mutations = {
    addPlantation(state, item) {
        if(state.plantations.length){
            item.id = state.plantations[state.plantations.length - 1].id + 1
        } else {
            item.id = 0;
        }
        state.plantations.push(item);
    },
    editPlantation(state, item) {
        const index =  state.plantations.findIndex(object => {
            return object.id === item.id;
          });
        state.plantations[index] = item;
    },
    deletePlantation(state, item) {
        const index =  state.plantations.findIndex(object => {
            return object.id === item.id;
          });
        state.plantations.splice(index, 1);
    }
}

export default mutations;