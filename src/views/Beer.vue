<template lang='pug'>
    div
        .item-card(v-if="beer") 
            h1 {{beer.name}}
            .image(v-bind:style="{ backgroundImage: 'url(' + beer.image_url + ')' }") 
            h3 {{beer.tagline}}
            p {{beer.description}} 
            |{{beer.brewers_tips}}
        br
        br
</template>

<script>
export default {
    computed:{
        beer(){
            return this.$store.getters.beer
        }
    },
    mounted(){
        this.$store.dispatch('getBeer', this.$route.params.id)
    }
}
</script>

<style scoped>
.image{ 
    width:100px;
    height:200px;
    margin: 0 auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
.item-card{
    width: 95%;
    border-radius: 4px;
    padding:10px;
    min-width: 250px;
    margin: 0 auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}  
</style>
