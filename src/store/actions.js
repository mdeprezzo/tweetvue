import * as types from './mutation-types'
import twitter from '../twitter'

export default {
  selectTweet ({ commit }, tweet) {
    commit(types.SELECT_TWEET, tweet)
  },
  searchTweets ({ commit }, term) {
    window.f7.showPreloader()

    twitter.cb.__call(
      "search_tweets",
      "q="+term,
      (reply) => {
        commit(types.SET_TWEETS, { tweets: reply.statuses })

        let mainView = Dom7('#mainView')[0].f7View
        mainView.router.load({ url: '/search/' })

        window.f7.hidePreloader()
      },
      true // this parameter required
    )
  }
}