import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    favourites: []
  },
  getters: {
    beers: (state) => state.beers,
    favourites: (state) => state.favourites
  },
  mutations: {
    SET_BEERS: (state, payload) => {
      state.beers = payload
    },  
    SET_FAVS: (state, payload) => {
      state.favourites = payload
    }
  },
  actions: {
    getBeers: async (ctx) => {
      try{ 
        let response  = await axios.get('https://api.punkapi.com/v2/beers/random')
        ctx.commit('SET_BEERS', response.data)
      } catch (err) {throw err}
    },
    searchBeers: async (ctx, beer_name) => {
      try {
        let response  = await axios.get('https://api.punkapi.com/v2/beers?beer_name='+beer_name)
        ctx.commit('SET_BEERS', response.data)
      } catch (err) {throw err}
    },
    getFavourites: (ctx) => {
      try{
        let favs      = JSON.parse(localStorage.getItem('favourites'))
        let query_ids = favs.join('|')
        let res       = await axios.get('https://api.punkapi.com/v2/beers/random?ids='+query_ids)
        ctx.commit('SET_FAVS', res.data)
      } catch(err) {throw err}
    },
    addToFavourites: (ctx, item) => {
      let favs = JSON.parse(localStorage.getItem('favourites'))
      favs.push(item)
      localStorage.setItem('favourites',JSON.stringify(favs))      
    }
  }
})
