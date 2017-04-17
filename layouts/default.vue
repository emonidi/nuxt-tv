<template>
  <v-app id="sidebar-example-2" top-toolbar sidebar-under-toolbar>
    <v-toolbar class="primary">
      <v-toolbar-side-icon @click.native.stop="sidebar2 = !sidebar2"/>
      <v-toolbar-title>
        <nuxt-link to="/">BGTV</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<v-btn icon dark router @click.native="toggleCastSession()">-->
      <!--<v-icon>cast</v-icon>-->
      <!--</v-btn>-->
      <v-btn icon dark router nuxt to="/cast">
        <v-icon>cast</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-sidebar class="blue darken-3" drawer v-model="sidebar2" height="100%">
        <ChannelList></ChannelList>
      </v-sidebar>
      <v-content>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-7905036614069244"
             data-ad-slot="3980735135"
             data-ad-format="auto"></ins>
        <nuxt></nuxt>
      </v-content>
    </main>
  </v-app>
</template>

<script>

  import { mapState } from 'vuex'
  import ChannelList from '~components/ChannelList.vue'
  import axios from 'axios'
  import Vue from 'vue'
  import Vuetify from 'vuetify'
  Vue.use(Vuetify)

  export default {
    layout: 'default',
    components: {
      ChannelList
    },
    mounted () {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      })
    },
    head () {
      return {
        title: this.seo.title,
        meta: [
          {hid: 'description', name: 'description', content: this.seo.description}
        ]
      }
    },
    computed: {
      ...mapState({
        channels: state => state.channelList.menu,
        castSession: state => state.castSession,
        seo: state => state.seo
      })
    },
    created (ev) {
      let self = this
      axios.get('https://bgtvbackend-airpong.rhcloud.com/stations').then(function (res) {
        let channels = []
        res.data.menu.forEach((item) => {
          item.href = '/watch/' + item.href.replace('?id=', '')
          channels.push(item)
        })
        self.$store.commit('setChannelList', res.data)
      })
    },
    methods: {
      setSeoProps: (channelName) => {
        let seo = {
          title: channelName + 'на живо',
          description: `Гледай ${channelName} на живо безплатно и без регистрация. ${channelName} онлайн на компютър и мобилен телефон.`
        }
        console.log(seo)
        this.$store.commit('setSeoProps', seo)
      },
      toggle: (ev) => {
        this.default.computed.opened = true
      },
      toggleCastSession () {
        if (!window.cast.framework.CastContext.getInstance().getCurrentSession()) {
          window.cast.framework.CastContext.getInstance().requestSession()
            .then(() => {
              this.$store.commit('setCastSession', window.cast.framework.CastContext.getInstance().getCurrentSession())
            }, () => {
            })
        } else {
          window.cast.framework.CastContext.getInstance().endCurrentSession(true)
          this.$store.commit('setCastSession', null)
        }
      }
    },
    data () {
      return {
        sidebar2: false
      }
    }
  }
</script>


<style>
  @media (min-width: 640px) {
    main {
      padding: 0 5%;
    }
  }

  .toolbar__title a{
    color:#fff;
    text-decoration: none;
    font-weight: 400;
  }
</style>
