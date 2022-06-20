<template>
  <h1>Neues von Dir!</h1>
  <div class="card">
    <DataView  :value="posts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>

      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">

          <own-post-card class="postCard" :post="slotProps.data" />
        </div>
      </template>
    </DataView>
  </div>
</template>


<script>
import OwnPostCard from "../components/OwnPostCard.vue";

export default {
  name: "OwnPosts",
  components: {OwnPostCard},
  inject: ["backendurl", "tempUser"],
  data() {
    return {
      posts: null,
      layout: 'grid'
    }
  },
  mounted: function(){
    this.getOwnPosts(this.tempUser)
  },
  methods: {
    getOwnPosts: function(userId) {
      const options = {
        method: 'GET'
      };
      fetch(`${this.backendurl}users/getAllOwnPosts/${userId}`, options)
          .then((response) => response.json())
          .then((data) => {
            this.posts = data
          })
          .catch(error => {
            console.log(error)
          });
      }
    }
}
</script>

<style scoped>
.postCard{
  margin : 10px;
}
</style>