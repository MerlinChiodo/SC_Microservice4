<template>
  <Button v-if="currentUser.isUserLoggedIn ===false" label="Zum Login"  class="p-button p-button-success" @click="login"/>
  <Button v-else label="Logout"  class="p-button p-button-success" @click="logout"/>
</template>

<script>
import {useCurrentUserStore} from "../stores/currentUser.js"
export default {
  name: "LoginButton",
  data() {
    return {
      currentUser: useCurrentUserStore(),
      token : null
    }
  },
  inject: ["smartAuthUrl", "frontendurl"],
  methods: {
    login() {
      console.log
      window.location.href =
          this.smartAuthUrl +
          `external?redirect_success=${this.frontendurl}&redirect_error=${this.frontendurl}`;
    },
    logout () {
      this.token=null
      this.currentUser.$reset()
      location.reload()
    },
  }
}
</script>

<style scoped>

</style>