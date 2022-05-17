<template>
  <div id="app">
    <top-bar></top-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <mu-back-top/>
  </div>
</template>

<script>
import TopBar from "./view/TopBar"
export default {
  name: 'app',
  components:{
    TopBar,
  }
}
</script>

<style>
#app {
  font-family:'微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}
</style>
