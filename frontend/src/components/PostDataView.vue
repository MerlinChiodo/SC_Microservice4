<template>
  <div class="card">
    <DataView :value="posts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>
        <!--<div class="col-6" style="text-align: left">
          <label for="category">Kategorie</label><br>
          <Dropdown id="category" v-model="category" :options="categories" optionLabel="label" optionValue="value" @change="filterPosts()"/>
          <div v-if="category=='SUCHE'||category=='BIETE'">
            <label for="category_subject">Um was geht es genau?</label><br>
            <Dropdown id="category_subject" v-model="category_subject" :options="categories_Subjects" optionLabel="label" optionValue="value"  @change="filterPosts()" />
          </div>
        </div>-->
      </template>


      <template #grid="slotProps">
        <div class="col-12 md:col-4">

          <ServicePostCard v-on:notify="getSavedPosts(this.currentUser.id)" class="col-12 md:col-4 h-full w-full flex" :post="slotProps.data" :saved="checkIfpostSaved(slotProps.data)"/>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
//const backendurl = "http://localhost:3001/";
//const backendurl = "http://" + location.host + "/" ;
import ServicePostCard from '../components/ServicePostCard.vue'
import {useCurrentUserStore} from "../stores/currentUser";

export default {
  name: "PostDataView",
  inject: ["backendurl"],
  components: {ServicePostCard},
  data() {
    return {
      currentUser: useCurrentUserStore(),
      posts: [],
      displayedPosts: [],
      savedPosts: [],
      layout: 'grid',

    }
  },
  mounted: function(){
    this.getServicePosts();
    if(this.currentUser.id) {
      this.getSavedPosts(this.currentUser.id);
    }
  },
  methods: {
    getServicePosts(){
      const options = {
        method: 'GET'
      };
      fetch(this.backendurl + "posts/getAllServicePosts", options)
          .then((response) => response.json())
          .then((data) => {
            this.posts = data
            this.displayedPosts = data
          })
          .catch(error => {console.log(error)});
    },
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
    checkIfpostSaved(post){
      if (this.savedPosts.find(currentPost => currentPost.id === post.id)) {
        return true
      }
      return false
    },
    routeToPostView(id) { // this pushes it to the component that has the display view details i.e DisplayDetailView.vue
      this.$router.push(`/postView${id}`)
      }
  }
}
</script>

<style scoped>
.post-grid-item{
  margin: 5px;
  border: 4px solid black;
  border-radius: 10px;
  padding: 3px;
}
.post-title{
  font-size: 30px;
}
.post-grid-item-content{
  margin: 5px;
}
.post-service{
  text-decoration: underline;
}
</style>