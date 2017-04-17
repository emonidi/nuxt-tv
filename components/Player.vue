<template>

</template>


<script>

  export default{
    video: null,
    player: null,
    props: ['url'],
    mounted () {
      this.video = this.$refs.video
      this.hls = new Hls()
      console.log(this.props)
//      console.log(this.hls)
//      console.log(this.props)
//      this.$refs.video.play()
    },

    created: () => {
      console.log(this.$refs)
    },
    watch: {
      url: (val) => {
        // console.log(val)
      }
    }
  }
</script>
