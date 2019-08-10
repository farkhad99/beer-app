 <template lang="pug">
  .home 
    div.container(v-if="favourites.length != 0")
      h1 Your favourites
      div(v-for="(beer) in favourites", :key="beer.id", class='grid-item')
        ItemCard(:name='beer.name', :desc='beer.description', :image="beer.image_url", :id="beer.id")
    h1(v-else) No favourites yet...
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
@import '../assets/media-grid.css';
</style>