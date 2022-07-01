
<template>
  <h1>Neues von den Smart-Bewohnern!</h1>
  <div class="card">
    <DataView  :value="posts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>

      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">

          <user-post-card v-on:notify="getSavedPosts(this.currentUser.id)" class="col-12 md:col-4 h-full w-full flex"  :post="slotProps.data" :saved="checkIfpostSaved(slotProps.data)"/>
          </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import UserPostCard from '../components/UserPostCard.vue'
import {useCurrentUserStore} from "../stores/currentUser";
//const backendurl = "http://" + location.host + "/" ;
//const backendurl = "http://localhost:3001/";

export default {
  name: "BlackBoard",
  components: {UserPostCard},
  inject: ["backendurl"],
  data() {
    return {
      currentUser: useCurrentUserStore(),
      posts: [],
      savedPosts: [],
      layout: 'grid'
    }
  },

  mounted: function(){
    this.getUserPosts();
    if(this.currentUser.id) {
      this.getSavedPosts(this.currentUser.id);
    }
  },
  methods: {
    getSavedPosts: function(userId){
      const options = {
        method: 'GET'
      };
      fetch( `${this.backendurl}users/getAllSavedPosts/${userId}`, options)
          .then((response) => response.json())
          .then((data) => {
            this.savedPosts = data
          })
          .catch(error => {
            console.log(error)
          });
    },
    getUserPosts(){
      const options = {
        method: 'GET'
      };
      fetch(this.backendurl + "posts/getAllUserPosts", options)
          .then((response) => response.json())
          .then((data) => {
            this.posts = data
            console.log(data)
          })
          .catch(error => {console.log(error)});
    },
    checkIfpostSaved(post){
        if (this.savedPosts.find(currentPost => currentPost.id == post.id)) {
          return true
        }
      return false
    },
  }
}
</script>

<style scoped>

.postCard{
  margin : 10px;
}


</style>