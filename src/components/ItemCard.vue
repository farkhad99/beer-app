<template lang="pug">
  div.card 
    div.star_container(@click="addToFavs()")  
      img.star_icon(src='../assets/black_star.png' v-if="!added")
      img.star_icon(src='../assets/bright_star.png', v-else)
    div
      .img
        .image(v-bind:style="{ backgroundImage: 'url(' + image + ')' }") 
      .text
        h4
          router-link(tag='h4', :to="'/beer/'+id") {{name}}
        div.desc {{desc.substring(0,160)}}...
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    id: Number,
    showBtn: Boolean,
    name: String,
    image: String,
    desc: String
  },
  computed: {
    added(){
      let res = false
      this.$store.getters.favourites.map(item => {
        if(item.id == this.id) res = true 
      })
      return res
    }      
  },
  methods: {
    addToFavs(){
      if(this.added) this.$store.dispatch('deleteFromFavs', this.id)  
      else this.$store.dispatch('addToFavourites', this.id)
    }
  }
}
</script>

<style scoped>
  .text{
    display: inline-block;
    width:50%;
    height: 100%;
  }
  .img{
    width:35%;
    padding-top:-30px;
  }
  h4 {
    text-align: left;
    max-height: 40px;
    cursor: pointer
  } 
  .desc{
    text-align:left!important;
  }
  .star_icon{
    float:right;
    width: 20px;
    height:20px;
    cursor: pointer;
  }
  .card{
    border-radius: 4px;
    padding:10px;
    min-width: 250px;
    max-width: 475px;
    min-height: 220px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  } 
  .image{ 
    float:left;
    width:100%;
    margin: 0 auto;
    min-height:140px;
    margin-top: 20px!important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
