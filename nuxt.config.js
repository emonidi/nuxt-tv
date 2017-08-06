var axios = require('axios')
module.exports = {
  cache: true,
  /*
   ** Headers of the page
   */
  head: {
    title: 'BGTV - Българска телевизия на живо от мобилният ти телефон.с',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic"'},
      {rel: 'stylesheet', href: '//fonts.googleapis.com/icon?family=Material+Icons'},
      {href:"https://vjs.zencdn.net/6.2.4/video-js.css",rel:"stylesheet"}
    ],
    script: [
      {src: 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'},
      {src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'},
      {src: 'https://vjs.zencdn.net/6.2.4/video.js'},
      {src: "https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.8.2/videojs-contrib-hls.min.js"},
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  css: [
    '~/node_modules/vuetify/dist/vuetify.min.css',
    'assets/style.scss'
  ],
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  generate: {
    routes: function () {
      return axios.get('http://bgtvbackend-airpong.rhcloud.com/stations')
        .then((res) => {
          return res.data.menu.map((station) => {
            return '/watch/' + station.href.replace('?id=', '')
          })
        })
    }
  },
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ],
  build: {
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
