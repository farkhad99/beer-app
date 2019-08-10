<template lang="pug">
  .card 
    h2 {{name}} {{id}}
    div.image(v-bind:style="{ backgroundImage: 'url(' + image + ')' }") 
    p.desc {{desc}}
    button(@click="addToFavs()", v-if="showBtn") Add ++
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    id: Number,
    showBtn: Boolean,
    name: String,
    image: String,
    desc: String
  },
  methods: {
    addToFavs(){
      this.$store.dispatch('addToFavourites', this.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    width: 100%;
    padding:10px
  } 
  .image{ 
    float:left;
    width:100px;
    height:100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .desc{
    text-align: left
  }
  /* .icon{ 
    width: 100px;
    height: 200px;
  } */
</style>
