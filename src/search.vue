<template lang="jade">
  f7-page#searchPage(data-page='searchPage')
    f7-navbar(back-link='Back', sliding='', title='Search results')
    f7-list.search-results(media-list)
      f7-list-item(@click='onClick(tweet)', v-for='tweet in tweets', :media='tweet | imgFilter', :title='tweet | userFilter', :subtitle='tweet | screenNameFilter', :text='tweet.text', link='/tweet/')
</template>

<script>
import { mapGetters } from 'vuex'
import filters from './filters'

export default {
  name: 'searchResults',
  computed: mapGetters({
    tweets: 'allTweets'
  }),
  methods: {
    onClick(tweet) {
      this.$store.dispatch('selectTweet', tweet)
    }
  },
  filters
}
</script>

<style lang="sass?indentedSyntax">
  .search-results
    .item-media
      img
        border-radius: 100%
</style>