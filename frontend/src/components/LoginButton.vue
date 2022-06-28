<template>

  <Button v-if="currentUser.id" label="Logout"  class="p-button p-button-success" @click="logout"/>
  <Button v-else label="Zum Login"  class="p-button p-button-success" @click="login"/>
</template>

<script>
import {useCurrentUserStore} from "../stores/currentUser.js"
export default {
  name: "LoginButton",
  data() {
    return {
      currentUser: useCurrentUserStore(),
    }
  },
  inject: ["smartAuthUrl", "frontendurl"],
  methods: {
    login() {
      console.log
      window.location.href =
          this.smartAuthUrl +
          `external?redirect_success=${}&redirect_error=${this.frontendurl}`;
    },
    logout () {
      this.currentUser.id= null
      this.currentUser.smartcity_id=null
      this.currentUser.user_session_token = null
      localStorage.removeItem("user_session_token")
      this.currentUser.user= null
      this.$router.push(`/`)
    },
  }
}
</script>

<style scoped>

</style>