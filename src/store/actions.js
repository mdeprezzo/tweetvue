import * as types from './mutation-types'
import cb from '../twitter'

export default {
  selectTweet ({ commit }, tweet) {
    commit(types.SELECT_TWEET, tweet)
  },
  searchTweets ({ commit }, term) {
    window.f7.showPreloader()

    cb.__call(
      "search_tweets",
      "q="+term,
      (reply) => {
        window.f7.hidePreloader()
        let tweetsModified = reply.statuses

        tweetsModified.map(tweet => {
          tweet.user.screen_name_at = '@'+tweet.user.screen_name
          tweet.user.profile_image_html = '<img src="'+tweet.user.profile_image_url+'">'
          return tweet
        })

        commit(types.SET_TWEETS, { tweets: tweetsModified })
      },
      true // this parameter required
    )
  },
  clearTweets ({ commit }) {
    commit(types.CLEAR_TWEETS)
  }	
}