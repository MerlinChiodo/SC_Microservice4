<template>
  <h1>Neues aus der Smart-City!</h1>
  {{this.currentUser.smartcity_id}}
  {{this.currentUser.id}}
  <post-data-view></post-data-view>
</template>

<script>
import PostDataView from "../components/PostDataView.vue";
import {useCurrentUserStore} from "../stores/currentUser";
export default {
  name: "News",
  components: {PostDataView},
  inject:["smartAuthUrl", "backendurl"],
  data() {
    return {
      currentUser: useCurrentUserStore(),
      token : null
    }
  },
  methods: {
    async getUser(smartcity_id){
      const options = {
        method: 'GET'
      };
      fetch(this.backendurl + `users/getUserWithSmartcityId/${this.currentUser.smartcity_id}`, options)
          .then((response) => response.json())
          .then((data) => {
            this.currentUser.id = data.id
            return data.id
          })
          .catch(error => {console.log(error)});
    },
    async createUser(smartcity_id){
      const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {
          "smartcity_id" : smartcity_id
        })
      };
      fetch(this.backendurl + `users/createUser`, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.id)
        this.currentUser.id = data.id
      })
          .catch(error => {console.log(error)})
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


        if(!this.currentUser.id){
        const id = await this.getUser(this.currentUser.smartcity_id)
        console.log(id)
        if(id) {
          console.log("existierte noch nicht")
          this.createUser(this.currentUser.smartcity_id)
          console.log(this.currentUser.id)
        }

        }
      }
    }

  }
}
</script>

<style scoped>

</style>