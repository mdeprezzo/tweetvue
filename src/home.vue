<template lang="jade">
  div#app
    f7-login-screen#loginScreen
      f7-view
        f7-pages
          f7-page.loginPageScreen(login-screen='')
            f7-login-screen-title TwitVue
            img.twitlogo(src="gfx/twitter.png")
            f7-list
              f7-list-button(title='Sign In', @click="onSignIn")
              f7-list-label
                p Click Sign In to close Login Screen  
    f7-views(navbar-through='')
      f7-view#mainView(main='', url='/', :dynamic-navbar='true')
        f7-navbar
          f7-nav-left
          f7-nav-center(sliding='') TwitVue
          f7-nav-right
        f7-pages#pages
          f7-page.navbar-fixed
            f7-searchbar(cancel-link='Cancel', placeholder='Search in items', :clear='true', @change='onChange')
            f7-list.tweets(media-list)
              f7-list-item(@click='onClick(tweet)', v-for='tweet in tweets', :media='tweet | imgFilter', :title='tweet | userFilter', :subtitle='tweet | screenNameFilter', :text='tweet.text', link='/tweet/')
</template>

<script>
import { mapGetters } from 'vuex'
import filters from './filters'

export default {
  name: 'app',
  computed: mapGetters({
    tweets: 'myTweets'
  }),
  created() {
    this.$store.dispatch('verifiedTokens')
  },
  methods: {
    onSignIn() {
      this.$store.dispatch('login')
    },
    onChange(e) {
      let term = e.target.value

      if (term) {
        this.$store.dispatch('searchTweets', term)
      }
    },
    onClick(tweet) {
      this.$store.dispatch('selectTweet', tweet)
    }
  },
  filters
}
</script>

<style lang="sass?indentedSyntax">
  .tweets
    .item-media
      img
        border-radius: 100%
  .loginPageScreen
    text-align: center
</style>
