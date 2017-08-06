<template>
  <v-btn block primary large @click.native="startCast($props.url)">
    <v-icon>cast</v-icon>
  </v-btn>
</template>


<script>
  export default {
    props: ['url'],
    url: null,
    mounted () {
      if (!window.cast) return
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      })
    },
    methods: {
      startCast: (url) => {
        if (!window.cast) return
        var player = new window.cast.framework.RemotePlayer()
        var playerController = new window.cast.framework.RemotePlayerController(player)

        var mediaInfo = new window.chrome.cast.media.MediaInfo(url, 'application/x-mpegURL')
        var request = new window.chrome.cast.media.LoadRequest(mediaInfo)

        var session = window.cast.framework.CastContext.getInstance().getCurrentSession()
        if (!session) {
          window.cast.framework.CastContext.getInstance().requestSession().then(
            function () {
              window.cast.framework.CastContext.getInstance().getCurrentSession()
                .loadMedia(request).then(
                function () {
                  console.log('Load succeed')
                },
                function (errorCode) {
                  console.log('Error code: ' + errorCode)
                  console.log(arguments)
                })
            },
            function (err) {
              console.log(err)
            }
          )
        } else {
          window.cast.framework.CastContext.getInstance().getCurrentSession()
            .loadMedia(request).then(
            function () {
              console.log('Load succeed')
            }
          )
        }
        playerController.addEventListener(
          window.cast.framework.RemotePlayerEventType.ANY_CHANGE,
          function (event) {
            console.log(event)
          })
      }
    }
  }
</script>

