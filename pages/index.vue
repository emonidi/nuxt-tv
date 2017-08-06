<template>
  <v-container fluid="fluid">
    <v-card class="mt-4" xs12 md4 v-for="info in channelInfo" :key="info.id">
      <v-card-row class="blue-grey darken-1">
        <v-card-title>
          <span class="white--text">{{info.bg_name}}</span>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card-row>
      <v-card-row class="logo" :img="info.logo" height="300px"></v-card-row>
      <v-card-text class="blue-grey darken-3 white--text">
        <div v-text="info.description"></div>
      </v-card-text>
      <v-card-row actions class="blue-grey darken-1 mt-0">
        <v-btn router nuxt :to="`/watch/${info.id}`" flat class="white--text">Гледай {{info.bg_name}} на живо</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text">launch</v-icon>
        </v-btn>
      </v-card-row>
    </v-card>
  </v-container>
</template>


<script>
  import { mapState } from 'vuex'
  import axios from 'axios'

  export default {
    computed: {
      ...mapState({
        channelInfo: state => {
          return state.channelList.channels
        }
      })
    },
    asyncData ({store, params}) {
      axios.get('https://bgtvbackend-airpong.rhcloud.com/stations').then(function (res) {
        // store.commit('setChannelList', res.data)
        return {
          channelInfo: res.data.channels
        }
      })
    },
    fetch ({store}) {
      axios.get('https://bgtvbackend-airpong.rhcloud.com/stations').then(function (res) {
        // store.commit('setChannelList', res.data)
        console.log(res.data.channels)
        return {
          channelInfo: res.data.channels
        }
      })
    }
  }
</script>

<style>
  .card__row.logo{
    background-size: 150px !important;
  }

  @media (max-width: 768px)  {
    .card{
      width:100%;
    }
  }

  @media (min-width: 768px) {
    .container{
      margin-left: -1.5%;
    }
    .card{
      width:47%;
      float: left;
      margin-left: 3%;
      min-height: 400px;
    }
    .card__text{
      height: 205px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

</style>
