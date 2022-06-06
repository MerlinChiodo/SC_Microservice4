<template>
  <div class="post">
    <div class="service">{{this.post.service}}</div>
    <h1>{{this.post.title}}</h1>
    <div  v-if="this.post.event_on">Termin: {{this.post.event_on}}</div>
    <div class="short_description">{{this.post.short_description}}</div>
    <div v-if="this.post.long_description" class="long_description">{{this.post.long_description}}</div>
  </div>
</template>

<script>
const backendurl = "http://localhost:3001/";
export default {
  name: "DetailedPost",
  data() {
    return {
      postid: null,
      post: null
    }
  },

  created() {
    this.postid = this.$route.params.postid
    this.getData();

  },
  mounted: function(){

  },
  methods: {
      getData() {
        const options = {
          method: 'GET'
        };
        fetch(backendurl + `posts/${this.postid}`, options)
            .then((response) => response.json())
            .then((data) => {
              this.post = data
            })
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
</style>