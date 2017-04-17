<template>
  <div>
    <video style="width:100%;" ref="video" controls></video>
    <!--<v-btn large block primary @click.native="play($route.params.station, $refs.video)">-->
    <!--<v-icon>play_arrow</v-icon>-->
    <!--</v-btn>-->
    <cast v-if="castSession" :url="url"></cast>
  </div>
</template>


<script>
  import { mapState } from 'vuex'
  import Cast from '~components/Cast'
  import axios from 'axios'
  import Hls from 'hls.js'

  let hls = new Hls()
  let getMedia = (station, video, store) => {
    axios.get(`https://bgtvbackend-airpong.rhcloud.com/station/?id=${station}`)
      .then((res) => {
        video.src = 'https://cors-airpong.rhcloud.com/' + res.data.url
        hls.loadSource('https://cors-airpong.rhcloud.com/' + res.data.url)
        hls.attachMedia(video)
        // video.play()
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
      this.video = this.$refs.video
      setTimeout(() => {
        this.$store.commit('setCastSession', window.cast.framework.CastContext.getInstance().getCurrentSession())
      }, 500)
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
