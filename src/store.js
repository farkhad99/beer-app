import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
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
        console.log(response)
        ctx.commit('SET_BEERS', response.data)
      } catch (err) {throw err}
    },
    getFavourites: async (ctx) => {
      try{
        let favs      = JSON.parse(localStorage.getItem('favourites'))
        let query_ids = favs.join('|')
        console.log(query_ids)
        let res       = await axios.get(ctx.state.url+'?ids='+query_ids)
        ctx.commit('SET_FAVS', res.data)
      } catch(err) {throw err}
    },
    addToFavourites: (ctx, item) => {
      let favs = JSON.parse(localStorage.getItem('favourites'))
      if(!favs) favs = []       
      favs.push(item)
      console.log(favs)
      localStorage.setItem('favourites',JSON.stringify(favs))      
    }
  }
})
