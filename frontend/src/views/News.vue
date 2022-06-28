<template>
  <h1>Neues aus der Smart-City!</h1>
  {{this.currentUser.smartcity_id}}
  {{this.currentUser.isUserLoggedIn}}
  <post-data-view></post-data-view>
</template>

<script>
import PostDataView from "../components/PostDataView.vue";
import {useCurrentUserStore} from "../stores/currentUser";
export default {
  name: "News",
  components: {PostDataView},
  inject:["smartAuthUrl"],
  data() {
    return {
      currentUser: useCurrentUserStore(),
      token : null
    }
  },
  async beforeMount () {
    console.log(this.currentUser.smartcity_id)
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
    } else if (this.currentUser.user_session_token) {
      this.token = this.currentUser.user_session_token;
    }
    console.log(this.token)
    if (this.token !== null) {
      console.log("vor fetch")
      const response = await fetch(`http://www.supersmartcity.de:9760/verify`, {
        method: 'POST',
        body: encodeURIComponent('code') + '=' + encodeURIComponent(this.token),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      const data = await response.json()
      if (response.status == 200) {
        localStorage.setItem("user_session_token", data.user_session_token);
        this.currentUser.user_session_token = data.user_session_token;
        this.currentUser.smartcity_id = data.citizen_id;
        this.currentUser.user = data.info;

        this.currentUser.isUserLoggedIn = true;
      }
    }

  }
}
</script>

<style scoped>

</style>