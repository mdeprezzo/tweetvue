import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [],
    selectedTweet: {}
  },
  modules: {
    auth
  },
  mutations,
  actions,
  getters: {
  	allTweets: (state) => state.tweets,
  	selectedTweet: (state) => state.selectedTweet
  }
})