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
  <TabMenu/>

    <h1>Forum</h1>
    <!----<div><RouterLink to="/testEvents">testEvent</RouterLink></div>---->

  <RouterView />
</template>

<style>

</style>
