import Vue from 'vue'
import Home from './home.vue'
import Routes from './routes.js'
import Framework7Vue from 'Framework7Vue'
import store from './store'

Vue.use(Framework7Vue);

new Vue({
  el: '#app',
  store,
  render: h => h(Home),
  // Framework7 Parameters
  framework7: {
      root: '#app', //Should be same as app el
      animateNavBackIcon: true,
      routes: Routes
  }
})
