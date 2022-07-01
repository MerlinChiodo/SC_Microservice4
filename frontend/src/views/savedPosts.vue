<template>
  <h1>Bekanntes aus der Smart-City!</h1>
  <div v-if="currentUser.id" class="card">
    <DataView  :value="displayedPosts" :layout="layout" :paginator="true" :rows="9" >
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

          <user-post-card v-on:notify="getSavedPosts(currentUser.id)" :post="slotProps.data" :saved="true"/>
        </div>
      </template>
    </DataView>
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
      posts: [],
      displayedPosts: [],
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
            this.posts = data
            this.displayedPosts = data
          })
          .catch(error => {
            console.log(error)
          });
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
.postCard{
  margin : 10px;
}
</style>