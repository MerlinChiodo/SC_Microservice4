<template>
  <div v-if="post" class="post">
  <Card id="wrapper" class="card">


    <template #header>

    </template>

    <template #title>
      <div class="flex justify-content-around flex-wrap align-items-center justify-content-start">
        <div class="align-items-center justify-content-around">
      <h3>{{this.post.title}}</h3>
      <div class="text-color-secondary text-xl">{{ this.post.service }}</div>
      <div  class="text-color-secondary text-xl" v-if="this.post.event_on">Termin: {{this.post.event_on.slice(0,this.post.event_on.search("T"))}}</div>
        </div>
        <div v-if="this.pictures">
          <div v-if="this.pictures[this.pictures.length-1] && this.pictures[this.pictures.length-1].path.substring(0,4) ==='http'">
            <Image height="250" :src="this.pictures[this.pictures.length-1].path"  preview/>
          </div>
          <div v-else>
            <Image :src="this.defaultPicture" alt="" height="250" preview/>
          </div>
        </div>
      </div>
    </template>
    <template #subtitle>

    </template>
    <template #content>
      <p class="short_description">{{post.short_description}}</p>
      <p>{{post.long_description}}</p>
    </template>
  </Card>
  </div>
</template>

<script>
//const backendurl = "http://localhost:3001/";
//const backendurl = "http://" + location.host + "/" ;
export default {
  name: "PostView",
  inject: ["backendurl", "defaultPicture"],
  data() {
    return {
      post: null,
      pictures: []
    }
  },

  created() {
    //this.postid = this.$route.params.postid
    this.getData();

  },
  mounted: function(){

  },
  methods: {
    getData() {
      const options = {
        method: 'GET'
      };
      fetch(this.backendurl + `posts/${this.$route.params.postid}`, options)
          .then((response) => response.json())
          .then((data) => {
            this.post = data
            this.getPictures(this.post.id).then(data=>{
              for (let j in data){
                if(data[j].path.substring(0,4)==="http" ){
                  this.pictures.push({
                    "path": data[j].path
                  })
                }
                else if(data[j].path.charAt(data[j].path.length-4)!== "."){
                  this.pictures.push({
                    "path": data[j].path
                  })
                }
                else {
                  this.pictures.push({
                    "path": this.backendurl + `pictures/${data[j].id}`
                  })
                }
              }
            })
              .catch(error => {
                console.log(error)
              });
          })
          .catch(error => {
            console.log(error)
          });
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

.post{
  margin: 10px;

}

.short_description{
  font-weight: bold;
  margin-bottom: 30px;
}

#wrapper{
  margin:auto;
  max-width:80%;
}
</style>