<template>
  <h1>Neues von Dir!</h1>
  <div v-if="currentUser.id">
    <span >
      <Button label="neuen Post verfassen" icon="pi pi-pencil" class="p-button p-button-success" @click="routeToCreateNewPost"/>
    </span>
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
  </div>
  <div v-else>
    <h2>Aber wer bist du? Log dich ein!</h2>
  </div>
</template>


<script>
import OwnPostCard from "../components/OwnPostCard.vue";
import {useCurrentUserStore} from "../stores/currentUser";

export default {
  name: "OwnPosts",
  components: {OwnPostCard},
  inject: ["backendurl"],
  data() {
    return {
      currentUser: useCurrentUserStore(),
      posts: null,
      layout: 'grid'
    }
  },
  mounted: function(){
    if(this.currentUser.id) {
      this.getOwnPosts(this.currentUser.id)
    }
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
      },
    routeToCreateNewPost(){
      this.$router.push(`/neuerPost`)
    }
    }
}
</script>

<style scoped>
.postCard{
  margin : 10px;
}
</style>