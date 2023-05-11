export const state = () => ({
    me: {},
})

export const mutations = {
    SET_ITEMS(state, me) {
        state.me = me
    },
}
export const getters = {
    me: state => {
        return state.me;    
    }
}

export const actions = {
    async me({ commit }) {
        try {
            const response = await this.$axios.get("/api/me");
            commit('SET_ITEMS', response.data)
        }
        catch (error) {
            console.log(error);
        }
    }
}


