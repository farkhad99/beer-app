 <template lang="pug">
  .home 
    h1(v-if="favourites.length != 0") Your favourites
    h1(v-else) No favourites yet...
    div.container(v-if="favourites.length != 0")
      div(v-for="(beer) in favourites", :key="beer.id", class='grid-item')
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
@import '../assets/media-grid.css';
</style>