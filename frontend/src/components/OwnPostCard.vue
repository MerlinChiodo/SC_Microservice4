<template>
  <div>
    <Card style="width: 25em" class="card">
      <template #header>
        <!--<img src="post.picture" style="height: 15rem" alt="kein Bild"/>-->
      </template>
      <template #title>
        {{ post.title }}
      </template>
      <template #subtitle>
        {{ post.category }}
        <div v-if="checkShowCategorySubject(post.category)">{{ post.category_subject }}</div>

      </template>
      <template #content>
        <p>{{post.short_description}}</p>
      </template>
      <template #footer>
        <Button  label="Bearbeiten"  @click="routeToPostView(post.id)"></Button>
        <span class="deleteButton"><Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deletePost(post.id)"/></span>


      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "OwnPostCard",
  inject: ["backendurl", "tempUser"],
  props: {
    post: Object
  },
  methods :{
    routeToPostView(id) { // this pushes it to the component that has the display view details i.e DisplayDetailView.vue
      this.$router.push(`/UserPostView${id}`)
    },
    checkShowCategorySubject: function (value) {
      if (value === 'SUCHE' || value == 'BIETE') {
        return true;
      }
      return false;
    },
    deletePost: function(postId){
      const options = {
        method: 'DELETE'
      };
      fetch( `${this.backendurl}posts/${postId}`, options)
          .then((response) => response.json())
          .then((data) => {
          })
          .catch(error => {
            console.log(error)
          });
    }
  }
}
</script>

<style scoped>
.deleteButton{
  float: right;

}

.card{
  text-align: center;
}
</style>