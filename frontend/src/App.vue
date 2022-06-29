<script >
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

import TabMenu from './components/navBar.vue'
import LoginButton from './components/LoginButton.vue'

export default {
  components: {
    TabMenu, LoginButton
  }

};
</script>

<template>
  <h1 class="heading">Forum</h1>
<LoginButton/>
  <TabMenu/>


    <!----<div><RouterLink to="/testEvents">testEvent</RouterLink></div>---->

  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.heading{
  margin-left: 10px;
}

</style>
