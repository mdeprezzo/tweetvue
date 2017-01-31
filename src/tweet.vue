<template lang="jade">
  f7-page(hide-bars-on-scroll='')
    f7-navbar(back-link='Back', sliding='')
    f7-card.facebook-card
      f7-card-header.no-border
        .facebook-avatar 
          img.lazy(:src='tweet.user.profile_image_url', width='34', height='34')
        .facebook-name 
          {{ tweet | userFilter }}
        .facebook-date 
          {{ tweet.created_at | dateDiffForHumans }}
      f7-card-content 
        {{ tweet.text }}
        img.lazy(v-if='tweet.entities.media', :src='tweet | imgBackgroundFilter', width='100%')
      f7-card-footer.no-border
        a.link(href='#') Like
        a.link(href='#') Comment
        a.link(href='#') Share
</template>

<script>
import { mapGetters } from 'vuex'
import filters from './filters'

export default {
  name: 'tweet',
  computed: mapGetters({
    tweet: 'selectedTweet'
  }),
  filters
}
</script>

<style lang="sass?indentedSyntax">
  .facebook-card
    .card-header
      display: block
      padding: 10px

    .facebook-name
      margin-left: 44px
      font-size: 14px
      font-weight: 500
    
    .facebook-date
      margin-left: 44px
      font-size: 13px
      color: #8e8e93
    
    .card-footer
      background: #fafafa
      
      a
        color: #81848b
        font-weight: 500
    
    .card-content
      img
        display: block
    
    .card-content-inner 
      padding: 15px 10px
    
    .facebook-avatar
      float: left
</style>
