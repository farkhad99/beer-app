<template lang='pug'>
  #app
    #nav
      .logo 
        a(href="/") BEANS LOVE BEERS
      .links 
        router-link(to="/") Home 
        router-link(to="/favourites") Favourites
    router-view
</template>

<style>
body{
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  width: 100%;
  color: white;
  height: 60px;
  background-color: rgb(74, 214, 214);
  margin-bottom: 30px;
}
.links {
  float: right;
  margin: 20px;
}
#nav a {
  text-decoration: none;
  font-weight: bold;
  margin-left:20px;
  color:white;
  cursor: pointer
}
.logo{
  margin: 20px;
  float:left;
}
#nav a.router-link-exact-active {
  color: #95a59e;
}
@media(max-width: 460px){
  #nav{
    font-size: 14px!important;
  }
  .logo,.links {
    margin-left: -15px;
  }
  .links {
    margin-right: 5px;
  }
}
</style>
