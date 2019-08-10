<template lang='pug'>
  .home
    div
      input(v-model='searchText', placeholder='Search')
      button(@click="searchBeer") Search
    div.container
      span(v-for="(beer) in beers", :key="beer.id")
        ItemCard(:name='beer.name', :desc='beer.description', :showBtn='true' :image="beer.image_url", :id="beer.id")
          
</template>
<script>
import ItemCard from '@/components/ItemCard.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  data(){
    return {
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
    searchBeer(){
      this.$store.dispatch('searchBeers', this.searchText)
    },

  },
  mounted(){
    this.$store.dispatch('getBeers')
  }
}
</script>
<style scoped>
.home{
  width: 100%
}
.container {
  display: grid;
  grid-template-columns: 32% 32% 32%;
  margin: 0 auto;
  grid-column-gap: 1%
}
</style>

