<template>
<div>
  <Card style="width: 25em" class="card">
    <template #header>
      <img src="post.picture" style="height: 15rem" alt="kein Bild"/>
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
      <Button  label="Details"  @click="routeToPostView(post.id)"></Button>
      <span v-if="checkIfpostSaved(post.id)" class="saveButton"><Button icon="pi pi-save" class="p-button-rounded p-button-success" @click="savePost(post.id, 1)"/></span>
      <span v-else class="unsaveButton"><Button icon="pi pi-times-circle" class="p-button-rounded p-button-danger" @click="unsavePost(post.id)"/></span>


    </template>
  </Card>
  </div>
</template>

<script>
export default {
  inject: ["backendurl"],
  props: {
    post: Object,
    User: Object
  },
  mounted: function(){

  },

  methods: {

    checkShowCategorySubject: function (value) {
      if (value === 'SUCHE' || value == 'BIETE') {
        return true;
      }
      return false;
    },
    savePost: function(postId, userId){
        const options = {
          method: 'PUT'
        };
        fetch( `${this.backendurl}users/savePost/${userId}/${postId}`, options)
            .then((response) => response.json())
            .then((data) => {
            })
            .catch(error => {
              console.log(error)
            });
      },

    unsavePost: function(postId){

    },
    checkIfpostSaved(postId){
      return true
    },
    routeToPostView(id) { // this pushes it to the component that has the display view details i.e DisplayDetailView.vue
      this.$router.push(`/UserPostView${id}`)
    }
  },

}
</script>

<style scoped>
.saveButton{
  float: right;

}

.card{
  text-align: center;
}

</style>