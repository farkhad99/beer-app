import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    beer: {},
    favourites: [],
    url: 'https://api.punkapi.com/v2/beers'
  },
  getters: {
    beer: (state) => state.beer[0],
    beers: (state) => state.beers,
    favourites: (state) => state.favourites
  },
  mutations: {
    SET_BEERS: (state, payload) => {
      state.beers = payload
    },  
    SET_BEER: (state, payload) => {
      state.beer = payload
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
    getBeer: async (ctx,id) => {
      try{
        let response  = await axios.get(ctx.state.url+'/'+id)
        ctx.commit('SET_BEER', response.data)
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
        let favs      = JSON.parse(localStorage.getItem('favourites'))
        if(!favs) return
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