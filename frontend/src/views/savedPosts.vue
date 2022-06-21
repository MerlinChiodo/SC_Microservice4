<template>
  <h1>Bekanntes aus der Smart-City!</h1>
  <div class="card">
    <DataView  :value="savedPosts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>

      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">

          <user-post-card class="postCard" :post="slotProps.data" :saved="true"/>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import UserPostCard from "../components/UserPostCard.vue";

export default {
  name: "savedPosts",
  components: {UserPostCard},
  inject: ["backendurl", "tempUser"],
  data() {
    return {
      savedPosts: null,
      layout: 'grid'
    }
  },
  mounted: function(){
    this.getSavedPosts(this.tempUser)
  },
  methods: {
    getSavedPosts: function (userId) {
      const options = {
        method: 'GET'
      };
      fetch(`${this.backendurl}users/getAllSavedPosts/${userId}`, options)
          .then((response) => response.json())
          .then((data) => {
            this.savedPosts = data
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