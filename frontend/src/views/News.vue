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
    }
  },
  methods: {
     getUser(smartcity_id){
      const options = {
        method: 'GET'
      };
      return fetch(this.backendurl + `users/getUserWithSmartcityId/${smartcity_id}`, options)
          .then((response) => response.json())
          .then((data) => {
            return data
          })
          .catch(error => {console.log(error)});
    },
    createUser(smartcity_id){
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
        this.currentUser.id = data.id
      })
          .catch(error => {console.log(error)})
    }
  },
  async mounted () {
    let token
    if (this.$route.query.token) {
      token = this.$route.query.token;
    } else if (this.currentUser.user_session_token) {
      token = this.currentUser.user_session_token;
    }

    if (token) {
      const response = await fetch(`http://www.supersmartcity.de:9760/verify`, {
        method: 'POST',
        body: encodeURIComponent('code') + '=' + encodeURIComponent(token),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      const data = await response.json()
      if (response.status == 200) {
        this.currentUser.user_session_token = data.user_session_token;
        this.currentUser.smartcity_id = data.citizen_id;
        this.currentUser.user = data.info;


        this.getUser(this.currentUser.smartcity_id).then((data) => {
          if (data) {

            this.currentUser.id = data.id
          } else {
            //if user is not found, create new User in database
            this.createUser(this.currentUser.smartcity_id).then((data) => {
              if(this.currentUser.id ==null){
                localStorage.removeItem("user_session_token");
                this.currentUser.user_session_token =null;
                this.currentUser.smartcity_id = null;
                this.currentUser.user = null;
                this.token = null;
              }
                }
            )
          }
        })
      }
    }

  }
}
</script>

<style scoped>

</style>