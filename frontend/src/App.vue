<script >
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import TabMenu from './components/navBar.vue'

export default {
  components: {
    TabMenu,
  },
  inject: ["smartAuthUrl", "backendurl"],
  methods: {
    login() {
      window.location.href =
          this.smartAuthUrl +
          `external?redirect_success=${this.backendurl}&redirect_error=${this.backendurl}`;
    }
  }
};
</script>

<template>
  <h1 class="heading">Forum</h1>
  <Button label="Zum Login"  class="p-button p-button-success" @click="login"/>
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
