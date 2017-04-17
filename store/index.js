export const state = {
  channelList: [],
  currentChannel: {},
  castSession: false,
  seo: {
    title: 'Българска телевизия',
    description: 'Гледай безплатно българска телевизия онлайн. Гледай всички български телевизионни канали без регистрация.'
  }
}

export const mutations = {
  setChannelList (state, payload) {
    state.channelList = payload
  },
  setCurrentChannel (state, payload) {
    'use strict'
    state.currentChannel = payload
  },
  setCastSession (state, payload) {
    'use strict'
    state.castSession = payload
  },
  setSeoProps (state, payload) {
    'use strict'
    state.seo = payload
  }
}
