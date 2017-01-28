import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [],
    selectedTweet: {}
  },
  mutations,
  actions,
  getters: {
  	allTweets: (state) => state.tweets,
  	selectedTweet: (state) => state.selectedTweet
  }
})