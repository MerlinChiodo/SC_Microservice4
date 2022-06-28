<template>
  <h1>Neues aus der Smart-City!</h1>
  <post-data-view></post-data-view>
</template>

<script>
import PostDataView from "../components/PostDataView.vue";
import {useCurrentUserStore} from "../stores/currentUser";
export default {
  name: "News",
  components: {PostDataView},
  data() {
    return {
      currentUser: useCurrentUserStore(),
      token : null
    }
  },
  async beforeMount () {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
    } else if (this.currentUser.user_session_token) {
      this.token = this.currentUser.user_session_token;
    }
console.log(this.token)
    if (this.token !== null) {
      const response = await fetch('http://auth.smartcityproject.net:8080/verify', {
        method: 'POST',
        body: encodeURIComponent('code') + '=' + encodeURIComponent(this.token),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      const data = await response.json()
      if (response.status == 200) {
        localStorage.setItem("user_session_token", data.user_session_token);
        this.currentUser.user_session_token = data.user_session_token;
        this.currentUser.smartcity_id = data.smartcity_id;
        this.currentUser.user = data.info;

        this.isUserLoggedIn == true;
      }
    }

  }
}
</script>

<style scoped>

</style>