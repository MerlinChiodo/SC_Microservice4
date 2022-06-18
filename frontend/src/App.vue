<script >
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import TabMenu from './components/navBar.vue'

export default {
  components: {
    TabMenu,
  },
};
</script>

<template>
  <h1 class="heading">Forum</h1>
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
