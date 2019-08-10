<template lang='pug'>
  .home
    div 
      input(v-model='searchText', placeholder='Type beer name...')
      button(@click="searchBeer") Search
    h1(v-if="loading") Loading...
    div.container(v-else-if="beers.length")
      div(class='grid-item', v-for="(beer) in beers", :key="beer.id")
        ItemCard(:name='beer.name', :desc='beer.description', :image="beer.image_url", :id="beer.id")
    h1(v-else) No such beer     
</template>
<script>
import ItemCard from '@/components/ItemCard.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  data(){
    return {
      loading: true,
      searchText: ''
    }
  },
  components: {
    ItemCard
  },
  computed: {
    ...mapGetters(['beers'])
  },
  methods:{
    async searchBeer(){
      this.loading = true
      await this.$store.dispatch('searchBeers', this.searchText)
      this.loading = false
    },
    async getBeers(){
      this.loading = true
      await  this.$store.dispatch('getBeers')
      this.loading = false
    }
  },
  mounted(){
    this.$store.dispatch('getFavourites')
    this.getBeers()
  }
}
</script>
<style >
@import '../assets/media-grid.css';

.home{
  width: 100%
}
input {
  width: 50%;
  min-width: 200px;
  max-width: 600px;
  border: 1px solid rgb(176, 185, 202);
  border-radius: 4px;
  height: 35px;
  margin-bottom: 20px;
}
button{
  background-color: rgb(179, 131, 224);
  color: white;
  border-radius: 4px;
  border: 1px solid gainsboro;
  height: 40px;
  cursor: pointer;
  width: 80px;
}
</style>

