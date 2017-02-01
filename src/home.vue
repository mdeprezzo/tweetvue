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
      f7-view#mainView(main='', url='/')
        f7-pages#pages
          f7-page.navbar-fixed
            f7-navbar(title='TwitVue')
              f7-nav-right
                f7-link.f7-icons.open-picker(data-picker='.publish-new-tweet') compose
            f7-searchbar(cancel-link='Cancel', placeholder='Search in items', :clear='true', @change='onChange')
            f7-list.tweets(media-list)
              f7-list-item(@click='onClick(tweet)', v-for='tweet in tweets', :media='tweet | imgFilter', :title='tweet | userFilter', :subtitle='tweet | screenNameFilter', :text='tweet.text', link='/tweet/')
    f7-picker-modal.publish-new-tweet
      f7-toolbar
        f7-link.close-picker(data-picker='.publish-new-tweet', @click='resetStatus') Cancel
        f7-link(@click="publishStatus") Post
      .new-tweet-content
        f7-list(form='')
          f7-list-item
            f7-input(type='textarea', placeholder='Publish tweet', v-model='status')
</template>

<script>
import { mapGetters } from 'vuex'
import filters from './filters'

export default {
  name: 'app',
  computed: { 
    ...mapGetters({
      tweets: 'myTweets'
    }),
    status: {
      get () {
        return this.$store.getters.status
      },
      set (value) {
        this.$store.dispatch('setStatus', { status: value })
      }
    }
  },
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
    },
    publishStatus() {
      if (this.status && this.status.length > 0) {
        this.$store.dispatch('publishStatus')
      } else {
        alert('Insert some text!')
      }
    },

    resetStatus() {
      this.$store.dispatch('clearStatus')
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
