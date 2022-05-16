const mutations = {
    addPlantation(state, item) {
        console.log(item);
        state.plantations.push(item);
    }
}

export default mutations;