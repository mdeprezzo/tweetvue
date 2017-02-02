import Vue from 'vue'
import Home from './home.vue'
import Routes from './routes.js'
import Framework7 from 'framework7'
import Framework7Vue from 'Framework7Vue'
import store from './store'

document.addEventListener('deviceready', () => {
  Vue.use(Framework7Vue)

  new Vue({
    el: '#app',
    store,
    render: h => h(Home),
    framework7: {
      root: '#app',
      animateNavBackIcon: true,
      routes: Routes,
      material: true,
      pushState: true
    },
    methods: {
      onF7Init(F7) {
        this.$store.dispatch('verifiedTokens')
      }
    }
  })
})
