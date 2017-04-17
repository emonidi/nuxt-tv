<template>
  <v-list>
    <v-list-item v-for="channel in channels" :key="channel.href">
      <v-list-tile @click.native="setSeoProps(channel.name)" v-bind:href="channel.href" nuxt append>
        <v-list-tile-content>{{channel.name}}</v-list-tile-content>
      </v-list-tile>
    </v-list-item>
  </v-list>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    props: ['channels'],
    fetch ({store}) {
      alert('ok')
      axios.get('https://bgtvbackend-airpong.rhcloud.com/stations').then(function (res) {
        let channels = []
        res.data.menu.forEach((item) => {
          item.href = '/watch/' + item.href.replace('?id=', '')
          channels.push(item)
        })
        self.$store.commit('setChannelList', res.data)
        return {
          channels: res.data.menu
        }
      })
    },
    asyncData ({store}) {
      alert('ok')
      axios.get('https://bgtvbackend-airpong.rhcloud.com/stations').then(function (res) {
        let channels = []
        res.data.menu.forEach((item) => {
          item.href = '/watch/' + item.href.replace('?id=', '')
          channels.push(item)
        })
        self.$store.commit('setChannelList', res.data)
        return {
          channels: res.data.menu
        }
      })
    },
    computed: {
      ...mapState({
        channels: state => {
          console.log(state)
          return state.channelList.menu
        }
      })
    }
  }
</script>


<style>
  .md-list-item {
    padding: 1rem;
  }

  .md-list-item a {
    display: block;
  }
</style>
