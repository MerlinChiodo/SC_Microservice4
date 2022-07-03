
<template>
  <div id="wrapper">
  <h1>Neues von den Smart-Bewohnern!</h1>
  <div class="card">
    <DataView :value="displayedPosts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>
        <div class="col-6" style="text-align: left">
          <label for="category">Kategorie</label><br>
          <Dropdown id="category" v-model="category" :options="categories" optionLabel="label" optionValue="value" @change="filterPosts()"/>
          <div v-if="category=='SUCHE'||category=='BIETE'">
          <label for="category_subject">Um was geht es genau?</label><br>
          <Dropdown id="category_subject" v-model="category_subject" :options="categories_Subjects" optionLabel="label" optionValue="value"  @change="filterPosts()" />
            </div>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">

          <user-post-card  v-on:notify="getSavedPosts(this.currentUser.id)" class="col-12 md:col-4 h-full w-full flex"  :post="slotProps.data" :saved="checkIfpostSaved(slotProps.data)"/>
          </div>
      </template>
    </DataView>
  </div>
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
      posts : [],
      displayedPosts: [],
      savedPosts: [],
      layout: 'grid',
      category: "",
      category_subject: "",
      categories: [
        {label: "", value: ""},
        {label: "SUCHE", value: "SUCHE"},
        {label: "BIETE",value: "BIETE"}  ,
        {label: "FRAGE",value: "FRAGE"},
        {label: "VERANSTALTUNG",value: "VERANSTALTUNG"},
        {label: "MITTEILUNG",value: "MITTEILUNG"}
      ],
      categories_Subjects: [
        {label: "", value: ""},
        {label: "BUCH", value: "BUCH"},
        {label: "JOB",value: "JOB"}  ,
        {label: "MUSIK",value: "MUSIK"},
        {label: "ELEKTRONIK",value: "ELEKTRONIK"},
        {label: "IMMOBILIE",value: "IMMOBILIE"},
        {label: "KINDERZUBEHOER",value: "KINDERZUBEHOER"},
        {label: "TIER",value: "TIER"},
        {label: "KLEIDUNG",value: "KLEIDUNG"},
        {label: "HAUSHALT",value: "HAUSHALT"}
      ]
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
            this.displayedPosts = data
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
    filterPosts(){
      let temPosts = []
      if(this.category ===""){
        temPosts=this.posts;
      }
      else{
        for (let i in this.posts) {

          if (this.posts[i].category === this.category) {
            temPosts.push(this.posts[i])
            }
          }
        }
      if(this.category === "SUCHE" || this.category === "BIETE"){
        if(this.category_subject ===""){
          this.displayedPosts=temPosts;
        }
        else{
          console.log(this.category_subject)
          this.displayedPosts = [];
          for (let i in temPosts) {

            if (temPosts[i].category_subject === this.category_subject) {
              this.displayedPosts.push(temPosts[i])
            }
          }
        }
      }else{
        this.displayedPosts = temPosts
      }
    }
  }
}
</script>

<style scoped>


#wrapper{
  margin:auto;
  max-width:100rem;
}


</style>