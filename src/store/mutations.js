import * as types from './mutation-types'

export default {
  [types.SELECT_TWEET] (state, tweet) {
    state.selectedTweet = tweet
  },
  [types.SET_TWEETS] (state, payload) {
    state.tweets = payload.tweets
  }
}