<template>
  <div v-if="displayedPosts[0]">
    <DataView :value="displayedPosts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>
        <div class="col-6" style="text-align: left">
          <label for="service">Service</label><br>
          <Dropdown id="service" v-model="service" :options="services" optionLabel="label" optionValue="value" @change="filterPosts()"/>

        </div>
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
      service: "",
      services: [
        {label: "", value: ""},
        {label: "STADTBUS", value: "STADTBUS"},
        {label: "KITA",value: "KITA"}  ,
        {label: "FINANZAMT",value: "FINANZAMT"},
        {label: "BÜRGERBÜRO",value: "BÜRGERBÜRO"},
        {label: "FITNESSSTUDIO",value: "FITNESSSTUDIO"},
        {label: "SMARTAUTH",value: "SMARTAUTH"},
        {label: "INTEGRATION",value: "INTEGRATION"},
      ]

    }
  },
   beforeMount: async function(){
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
            for(let i in this.posts){
              this.getPictures(this.posts[i].id).then(data=> {
                this.posts[i].pictures = []
                for (let j in data){
                  if(data[j].path.substring(0,4)==="http" ){
                    this.posts[i].pictures.push({
                      "path": data[j].path
                    })
                  }
                  else if(data[j].path.charAt(data[j].path.length-4)!== "."){
                    this.posts[i].pictures.push({
                      "path": data[j].path
                    })
                  }
                  else {
                    this.posts[i].pictures.push({
                      "path": this.backendurl + `pictures/${data[j].id}`
                    })
                  }
              }
              })
                  .catch(error => {console.log(error)})
            }
          })
          .then(data=> {
            this.displayedPosts = this.posts
            console.log(this.posts)
            console.log(this.displayedPosts)
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
      },
    filterPosts(){
      let temPosts = []
      if(this.service ===""){
        temPosts=this.posts;
      }
      else{
        for (let i in this.posts) {
          if (this.posts[i].service && this.posts[i].service.toUpperCase() === this.service.toUpperCase()) {
            temPosts.push(this.posts[i])
          }
        }
      }

        this.displayedPosts = temPosts

    },
    getPictures (id){
      const options = {
        method: 'GET'
      };
      return fetch(this.backendurl + `pictures/getAllPictures/${id}`, options)
          .then((response) => response.json())
          .catch(error => {
            console.log(error)
          });
    }

  }
}
</script>

<style scoped>

</style>