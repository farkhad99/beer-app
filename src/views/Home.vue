<template lang='pug'>
  .home
    div 
      input(v-model='searchText', placeholder='Type beer name...')
      button(@click="searchBeer") Search
    h1(v-if="loading") Loading...
    div.container(v-else-if="beers.length")
      div(class='grid-item', v-for="(beer) in beers", :key="beer.id")
        ItemCard(:name='beer.name', :desc='beer.description', :showBtn='true' :image="beer.image_url", :id="beer.id")
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
    this.getBeers()
  }
}
</script>
<style scoped>
.home{
  width: 100%
}
input {
  width: 50%;
  min-width: 240px;
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
  cursor: pointer
}
.container {
  display: grid;
  grid-template-columns: 32% 32% 32%;
  margin: 0 auto;
  padding: 30px;
  grid-column-gap: 2%;
  grid-row-gap: 30px;
}

.grid-item{
  margin: 0 auto;
}

/* 
@media(min-width: 1080px){
  .container{
    grid-template-columns: 24% 24% 24% 24%!important;
    grid-column-gap: 1%;
  }
} */

@media(max-width: 1080px){
  .container{
    grid-template-columns: 49% 49% !important
  }
}

@media(max-width: 750px){
  .container{
    padding:10px;
    grid-template-columns: 100% !important
  }
}
</style>

