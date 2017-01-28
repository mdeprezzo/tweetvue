<template lang="jade">
  div#app
    f7-views(navbar-through='')
      f7-view(main='', url='/', :dynamic-navbar='true')
        f7-navbar
          f7-nav-left
          f7-nav-center(sliding='') TweetVue
          f7-nav-right
        f7-pages#pages
          f7-page.navbar-fixed
            f7-searchbar(cancel-link='Cancel', placeholder='Search in items', :clear='true', @change='onChange')
            f7-list.tweets(media-list)
              f7-list-item(@click='onClick(tweet)', v-for='tweet in tweets', :media='tweet.user.profile_image_html', :title='tweet.user.name', :subtitle='tweet.user.screen_name_at', :text='tweet.text', link='/tweet/')
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters({
    tweets: 'allTweets'
  }),
  methods: {
    onChange(e) {
      let term = e.target.value

      if (!term) {
        this.$store.dispatch('clearTweets')
      } else {
        this.$store.dispatch('searchTweets', term)
      }
    },
    onClick(tweet) {
      this.$store.dispatch('selectTweet', tweet)
    }
  }
}
</script>

<style lang="sass?indentedSyntax">
  .tweets
    .item-media
      img
        border-radius: 100%
</style>
