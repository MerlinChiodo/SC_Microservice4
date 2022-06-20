<!--<template>

<user-post-card  :post="post" />

</template>-->
<template>
  <div class="card">
    <DataView  :value="posts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>

      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">

          <user-post-card class="postCard" :post="slotProps.data" :saved="checkIfpostSaved(slotProps.data)"/>
          </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import UserPostCard from '../components/UserPostCard.vue'
//const backendurl = "http://" + location.host + "/" ;
//const backendurl = "http://localhost:3001/";

export default {
  name: "BlackBoard",
  components: {UserPostCard},
  inject: ["backendurl"],
  data() {
    return {
      posts: null,
      savedPosts: null,
      layout: 'grid'
    }
  },

  mounted: function(){
    this.getUserPosts();
    this.getSavedPosts(1);
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
          })
          .catch(error => {console.log(error)});
    },
    checkIfpostSaved(post){
      if(this.savedPosts != null) {
        if (this.savedPosts.indexOf(post) === -1) {
          return true
        }
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