<template>
     <div class="video-wrapper">
     <video id="video" style="width:100%;display" class="video-js vjs-default-skin vjs-big-play-centered" ref="video" controls webkit-playsinline></video>
     <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-7905036614069244"
            data-ad-slot="9913311752"
            data-ad-format="auto">
      </ins>
    </div>
</template>


<script>
  import { mapState } from 'vuex'
  import Cast from '~components/Cast'
  import axios from 'axios'
  // import videojs from 'video.js'
  // import 'videojs-contrib-hls'
  
  let getMedia = (station, video, store) => {
    axios.get(`https://bgtvbackend-airpong.rhcloud.com/station/?id=${station}`)
      .then((res) => {
        // video.src(res.data.url)
        let video = window.videojs('video')
        video.src([{
          src: res.data.url,
          type: 'application/x-mpegURL',
          withCredentials: false
        }])
      })
  }
  export default{
    video: null,
    components: {
      Cast
    },
    head () {
      return {
        title: this.seo.title,
        meta: [
          { hid: 'description', name: 'description', content: this.seo.description }
        ]
      }
    },
    created: () => {
      // this.default.hls = new Hls()
    },
    mounted () {
      getMedia(this.$route.params.station, this.$refs.video)
      if (window.cast) {
        setTimeout(() => {
          this.$store.commit('setCastSession', window.cast.framework.CastContext.getInstance().getCurrentSession())
        }, 500)
      }
    },
    computed: {
      ...mapState({
        channel: state => state.currentChannel,
        castSession: state => state.castSession,
        seo: state => state.seo
      })
    },
    watch: {
      '$route': (val) => {
        // window.location.reload()
      },
      castSession: (val) => {
        // console.log(val)
      }
    },
    async asyncData ({params}) {
      let {data} = await axios.get(`https://bgtvbackend-airpong.rhcloud.com/station/?id=${params.station}`)

      return {url: data.url}
    },
    methods: {
      play: (station, video) => {
        // console.log(this.$refs)
      }
    }
  }
</script>
