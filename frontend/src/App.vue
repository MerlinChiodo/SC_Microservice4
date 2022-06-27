<script >
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import {useCurrentUserStore} from "./stores/currentUser.js"
import TabMenu from './components/navBar.vue'

export default {
  components: {
    TabMenu,
  },
  data() {
    return {
      currentUser: useCurrentUserStore(),
      token : null,
      isUserLoggedIn: true
    }
  },
  inject: ["smartAuthUrl", "backendurl"],
  methods: {
    login() {
      window.location.href =
          this.smartAuthUrl +
          `external?redirect_success=${this.backendurl}&redirect_error=${this.backendurl}`;
    },
    logout () {
      this.token=null
      this.isUserLoggedIn =false
      this.currentUser.$reset
      location.reload()
    },
  },
  async mounted () {

    if(this.$route.query.token){
      this.token = this.$route.query.token;
    } else if (this.currentUser.user_session_token) {
      this.token = this.currentUser.user_session_token;
    }

    if(this.token !== null){
      const response = await fetch('http://auth.smartcityproject.net:8080/verify', {
        method: 'POST',
        body: encodeURIComponent('code') + '=' + encodeURIComponent(this.token),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
    }
    console.log(response);
    if (response.status == 200) {
      localStorage.setItem("user_session_token", data.user_session_token);
      this.currentUser.user_session_token = data.user_session_token;
      this.currentUser.smartcity_id = data.smartcity_id;
      this.currentUser.user = data.info;

      this.isUserLoggedIn == true;
    }



  },

};
</script>

<template>
  <h1 class="heading">Forum</h1>
  <Button v-if="this.isUserLoggedIn" label="Zum Login"  class="p-button p-button-success" @click="login"/>
  <Button v-else label="Logout"  class="p-button p-button-success" @click="logout"/>
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
