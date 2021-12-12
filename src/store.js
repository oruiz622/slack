import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// create the state that holds the data
const state = {
  currentUser: 'Orlando Ruiz',
}

// update the state data through mutations
const mutations = {
  SET_USER(state, user) {
    state.currentUser = user
  },
}

// create actions for mutations with necessary data
const actions = {
  setUser(state, user) {
    state.commit('SET_USER', user)
  },
}

// get data from the state
const getters = {
  currentUser: (state) => state.currentUser,
}

// create vuex store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

export default store
