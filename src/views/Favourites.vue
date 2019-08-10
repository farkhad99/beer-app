<template lang="pug">
  .home
    div.container
      span(v-for="(beer) in favourites", :key="beer.id")
        ItemCard(:name='beer.name', :desc='beer.description', :image="beer.image_url", :id="beer.id")
</template>
<script>
import {mapGetters} from 'vuex'
import ItemCard from '@/components/ItemCard.vue'

export default {
  components: {
    ItemCard
  },
  computed: {
    ...mapGetters(['favourites'])
  },
  mounted(){
    this.$store.dispatch('getFavourites')
  }
}
</script>

<style>

</style>

