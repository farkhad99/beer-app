import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    favourites: [],
    favourites: [],
    url: 'https://api.punkapi.com/v2/beers'
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
        let response  = await axios.get(ctx.state.url)
        ctx.commit('SET_BEERS', response.data)
      } catch (err) {throw err}
    },
    searchBeers: async (ctx, beer_name) => {
      try {
        if(beer_name == '') return;
        let response  = await axios.get(ctx.state.url+'?beer_name='+beer_name)
        ctx.commit('SET_BEERS', response.data)
      } catch (err) {throw err}
    },
    getFavourites: async (ctx) => {
      try{
        console.log('hey')
        let favs      = JSON.parse(localStorage.getItem('favourites'))
        let query_ids = favs.join('|')
        let res       = await axios.get(ctx.state.url+'?ids='+query_ids)
        ctx.commit('SET_FAVS', res.data)
      } catch(err) {throw err}
    },
    addToFavourites: (ctx, item) => {
      let favs = JSON.parse(localStorage.getItem('favourites'))
      if(!favs) favs = []       
      favs.push(item)
      localStorage.setItem('favourites',JSON.stringify(favs))      
      ctx.dispatch('getFavourites')
    },
    deleteFromFavs: (ctx, id) => {
      let favs = JSON.parse(localStorage.getItem('favourites'))
      if(!favs) favs = []       
      favs.map((item, index) => {
        if(item == id) favs.splice(index, 1); return
      })
      localStorage.setItem('favourites',JSON.stringify(favs))
      ctx.dispatch('getFavourites')
    }
  }
})