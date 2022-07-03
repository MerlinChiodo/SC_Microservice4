<template>
  <div>
    <Card style="width: 25em" class="card">
      <template #header>
        <div v-if="post.pictures" style="width:80%; margin:auto; margin-top:0.5em">
          <div v-if="post.pictures[post.pictures.length-1] && post.pictures[post.pictures.length-1].path.substring(0,4) ==='http'">
            <Image :src="post.pictures[post.pictures.length-1].path"  alt=""/>
          </div>
          <div v-else>
            <Image :src="this.defaultPicture" alt=""  />
          </div>
        </div>
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
  inject: ["backendurl", "defaultPicture"],
  props: {
    post: Object
  },
  data(){
    return{
      pictures:[]
    }
  },
  emits: ["notify"],
  beforeMount() {
  },
  methods :{
    routeToPostView(id) { // this pushes it to the component that has the display view details i.e DisplayDetailView.vue
      this.$router.push(`/PostBearbeiten${id}`)
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
            this.$emit("notify")
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