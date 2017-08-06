<template>
  <div>
    <v-list v-if="castSession">
      <v-list-item v-for="channel in channels" :key="channel.href">
        <v-list-tile @click.native="cast(channel.href)">
          <v-list-tile-content>{{channel.name}}</v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </v-list>
    <v-btn v-if="!castSession" primary @click.native="session($store)">Свържи се с Cast устройство</v-btn>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  export default{
    computed: {
      ...mapState({
        channels: state => state.channelList.menu,
        castSession: state => state.castSession
      })
    },
    mounted () {
      if (!window.cast) return
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: 'F3AC4145',
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      })
    },
    methods: {
      cast: (station) => {
        station = station.replace('/watch/', '')
        var player = new window.cast.framework.RemotePlayer()
        var playerController = new window.cast.framework.RemotePlayerController(player)
        axios.get(`https://bgtvbackend-airpong.rhcloud.com/station/?id=${station}`).then(
          (res) => {
            var mediaInfo = new window.chrome.cast.media.MediaInfo(res.data.url, 'application/x-mpegURL')
            var request = new window.chrome.cast.media.LoadRequest(mediaInfo)
            window.cast.framework.CastContext.getInstance().getCurrentSession()
              .loadMedia(request).then(
              function () {
                console.log('Load succeed')
              },
              function (err) {
                console.log(err)
              }
            )
          }
        )
        playerController.addEventListener(
          window.cast.framework.RemotePlayerEventType.ANY_CHANGE,
          function (event) {
            console.log(event)
          })
      },
      session: (store) => {
        let self = this
        console.log(self)
        window.cast.framework.CastContext.getInstance().requestSession()
          .then(() => {
            store.commit('setCastSession', true)
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
</script>
