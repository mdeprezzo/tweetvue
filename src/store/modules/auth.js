import * as types from '../mutation-types'
import QueryString from '../../querystring'
import twitter from '../../twitter'
import utils from '../../utils'

const state = {
  oauth_token: null || utils.getToken('oauth_token'),
  oauth_token_secret: null || utils.getToken('oauth_token_secret'),
  my_tweets: []
}

const getters = {
  token: state => state.oauth_token,
  secretToken: state => state.oauth_token_secret,
  myTweets: state => state.my_tweets
}

const actions = {
  verifiedTokens({ commit, state }) {
    if (QueryString.oauth_token && QueryString.oauth_verifier) {
      twitter.cb.setToken(state.oauth_token, state.oauth_token_secret)

      twitter.cb.__call(
          "oauth_accessToken",
          {
            oauth_verifier: QueryString.oauth_verifier
          },
          (reply, rate, err) => {
            if (err) {
              console.log("error response or timeout exceeded" + err.error)
              window.f7.loginScreen()
            }
            else if (reply) {
              twitter.cb.setToken(reply.oauth_token, reply.oauth_token_secret)
              utils.saveTokens(reply)

              commit(types.USER_LOGIN, { 
                oauth_token: reply.oauth_token, 
                oauth_token_secret: reply.oauth_token_secret 
              }) 

              location.href = "/"
            }
          }
      )
    }    
    else if (!state.oauth_token || !state.oauth_token_secret) {
      window.f7.loginScreen()
    } else {
      twitter.cb.setToken(state.oauth_token, state.oauth_token_secret)

      twitter.cb.__call(
        "statuses_homeTimeline",
        {},
        (reply, rate, err) => {
          commit(types.SET_AUTH_TWEETS, { tweets: reply })
        }
      )    
    }
  },

	login({ commit }) {
    window.f7.showPreloader()

  	twitter.cb.__call(
      "oauth_requestToken",
      {oauth_callback: "http://localhost:8080/"},
      (reply,rate,err) => {
        if (err) {
          console.log("error response or timeout exceeded" + err.error)
        }
        if (reply) {
          twitter.cb.setToken(reply.oauth_token, reply.oauth_token_secret)
          utils.saveTokens(reply)
          
          commit(types.USER_LOGIN, { 
            oauth_token: reply.oauth_token, 
            oauth_token_secret: reply.oauth_token_secret 
          })          

          twitter.cb.__call(
            "oauth_authorize", {},
            (auth_url) => {
              location.href = auth_url
            }
          )
        }
	    }
    )
	},

  logout({ commit }) {
    twitter.cb.logout()
    commit(types.USER_LOGOUT)
  }
}

const mutations = {
  [types.SET_AUTH_TWEETS](state, payload) {
    state.my_tweets = payload.tweets
  },

  [types.USER_LOGIN](state, payload) {
  	state.oauth_token = payload.oauth_token
  	state.oauth_token_secret = payload.oauth_token_secret
  },

  [types.USER_LOGOUT](state) {
    state.oauth_token = null
    state.oauth_token_secret = null
    state.my_tweets = []
  }
}

export default { state, getters, actions, mutations }