<template>
  <h1>detailedPost {{this.postid}}</h1>
  <div>{{this.post.title}}</div>
  <div>{{this.post.short_description}}</div>
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

</style>