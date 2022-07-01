<template>
  <h1>Bekanntes aus der Smart-City!</h1>
  <div v-if="currentUser.id" class="card">
    <div v-if="savedPosts && savedPosts.length !== 0">
    <DataView  :value="savedPosts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>

      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">

          <user-post-card v-on:notify="getSavedPosts(currentUser.id)" class="postCard" :post="slotProps.data" :saved="true"/>
        </div>
      </template>
    </DataView>
      </div>
    <div>Du hast noch keine gespeicherten Posts</div>
  </div>

  <div v-else>
    <h2>Aber wer bist du? Log dich ein!</h2>
  </div>
</template>

<script>
import UserPostCard from "../components/UserPostCard.vue";
import {useCurrentUserStore} from "../stores/currentUser";

export default {
  name: "savedPosts",
  components: {UserPostCard},
  inject: ["backendurl"],
  data() {
    return {
      currentUser: useCurrentUserStore(),
      savedPosts: null,
      layout: 'grid'
    }
  },
  mounted: function(){
    if(this.currentUser.id) {
      this.getSavedPosts(this.currentUser.id)
    }
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