<template>
<DataView :value="posts" layout='list'>
  <template #list="slotProps">
    <div class="col-12">
      <div class="car-details">
        <div>
          <img :src="'demo/images/car/' + slotProps.data.title + '.png'" :alt="slotProps.data.title"/>
          <div class="grid">
            <div class="col-12">Titel: <b>{{slotProps.data.title}}</b></div>
            <div class="col-12">Service: <b>{{slotProps.data.service}}</b></div>
            <div class="col-12">Kurzbeschreibung <b>{{slotProps.data.short_description}}</b></div>
          </div>
        </div>
        <Button icon="pi pi-search"></Button>
      </div>
    </div>
  </template>
</DataView>
</template>

<script>
const backendurl = "http://localhost:3001/";
import {getAllServicePosts} from '../controllers/postController'
export default {
  name: "postCard",
  data() {
    return {
      posts: [],
      layout: 'list'
    }
  },
  postService: null,

  mounted: function(){
    this.getServicePosts();

    //this.posts = getAllServicePosts()

  },
  methods: {
    getServicePosts(){
      const options = {
        method: 'GET'
      };
      fetch(backendurl + "posts/getAllServicePosts", options)
          .then((response) => response.json())
          .then((data) => {
            this.posts = data
          })
          .catch(error => {console.log(error)});
    }
    }

}
</script>

<style scoped>

</style>