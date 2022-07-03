<template>
  <div id="wrapper">
  <h1>Neues von Dir!</h1>
  <div v-if="currentUser.id">
    <span >
      <Button label="neuen Post verfassen" icon="pi pi-pencil" class="p-button p-button-success" @click="routeToCreateNewPost"/>
    </span>
    <div class="card">
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

            <own-post-card v-on:notify="getOwnPosts(this.currentUser.id)" class="col-12 md:col-4 h-full w-full flex" :post="slotProps.data" />
          </div>
        </template>
      </DataView>
    </div>
  </div>
  <div v-else>
    <h2>Aber wer bist du? Log dich ein!</h2>
  </div>
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
    routeToCreateNewPost(){
      this.$router.push(`/neuerPost`)
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
#wrapper{
  margin:auto;
  max-width:90%;
}
</style>