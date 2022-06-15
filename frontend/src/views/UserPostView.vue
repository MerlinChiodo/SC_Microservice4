<!--<template>

<user-post-card  :post="post" />

</template>-->
<template>
  <div class="card">
    <DataView  :value="posts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>

      </template>


      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <user-post-card  :post="slotProps.data" />
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import UserPostCard from '../components/UserPostCard.vue'
//const backendurl = "http://" + location.host + "/" ;
const backendurl = "http://localhost:3001/";

export default {
  name: "UserPostView",
  components: {UserPostCard},

  data() {
    return {
      posts: null,
      layout: 'grid'
    }
  },

  mounted: function(){
    this.getUserPosts();
  },
  methods: {
    getUserPosts(){
      const options = {
        method: 'GET'
      };
      fetch(backendurl + "posts/getAllUserPosts", options)
          .then((response) => response.json())
          .then((data) => {
            console.log("hi")
            this.posts = data
          })
          .catch(error => {console.log(error)});
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