<template >
  <div class="home">
    {{beers}}
    <ItemCard msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  components: {
    ItemCard
  },
  computed: {
    ...mapGetters(['beers'])
  },
  mounted(){
    this.$store.dispatch('getRandomBeers')
  }
}
</script>
