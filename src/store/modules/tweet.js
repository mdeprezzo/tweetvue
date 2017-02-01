import * as types from '../mutation-types'
import twitter from '../../twitter'

const state = {
	status: ''
}

const getters = {
	status: state => state.status
}

const actions = {
  setStatus({ commit }, status) {
  	commit(types.SET_STATUS, status)
  },

  publishStatus({ commit, state }) {
  	window.f7.showPreloader()

	twitter.cb.__call(
	  "statuses_update",
	  {"status": state.status},
	  (reply, rate, err) => {
	  	window.f7.hidePreloader()

	  	if (err) {
	  	  alert('some errors occurs!')
	  	} else {
	  	  window.f7.closeModal('.publish-new-tweet')
          commit(types.CLEAR_STATUS)
    	}
	  }
	)
  },

  clearStatus({ commit }) {
  	commit(types.CLEAR_STATUS)
  }
}

const mutations = {
  [types.SET_STATUS](state, payload) {
    state.status = payload.status
  },

  [types.CLEAR_STATUS](state) {
  	state.status = ''
  }
}

export default { state, getters, actions, mutations }