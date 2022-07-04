<script >
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

import TabMenu from './components/navBar.vue'
import LoginButton from './components/LoginButton.vue'
import ForumFooter from "./components/ForumFooter.vue";

export default {
  components: {
    ForumFooter,
    TabMenu, LoginButton
  }

};
</script>

<template>
  <h1 class="heading">Forum</h1>
<LoginButton/>
  <TabMenu />
  <RouterView />
  <footer class="footer">
    <a href="http://supersmartcity.de/">Landingpage</a>
      <a href="impressum">Impressum</a>
      <a href="datenschutz">Datenschutzerklärung</a>

  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  /*color: #2c397f;*/

}

body{
  /*background-color: #d1d5ed;*/
  /*background-color:#acb4df;*/
  /*background-color: #f5f6fb;*/
}

.heading{
  margin-left: 10px;
}

.footer{
  padding:20px;
  display: flex;
  justify-content: space-around;
}

a:link {
  text-decoration: none;
}

a:visited {
}

a:hover {
}
a{
  color:black
}

a:visited {
  color: black;
}

</style>
