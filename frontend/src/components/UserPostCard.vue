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
      <span v-if="saved" class="unsaveButton"><Button icon="pi pi-times-circle" class="p-button-rounded p-button-danger" @click="unsavePost(post.id,this.tempUser)"/></span>
      <span v-else class="saveButton"><Button icon="pi pi-save" class="p-button-rounded p-button-success" @click="savePost(post.id, this.tempUser)"/></span>

    </template>
  </Card>
  </div>
</template>

<script>
export default {
  inject: ["backendurl", "tempUser"],

  props: {
    post: Object,
    User: Object,
    saved: Boolean
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

    unsavePost: function(postId, userId){
      const options = {
        method: 'PUT'
      };
      fetch( `${this.backendurl}users/unsavePost/${userId}/${postId}`, options)
          .then((response) => response.json())
          .then((data) => {

          })
          .catch(error => {
            console.log(error)
          });

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

.unsaveButton{
  float: right;

}

.card{
  text-align: center;
}

</style>