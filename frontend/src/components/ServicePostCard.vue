<template>
  <div >
    <Card style="width: 25em" class="card">
      <template #header>
        <div v-if="post.pictures" style="width:80%; margin:auto; margin-top:0.5em">
          <div v-if="post.pictures[post.pictures.length-1] && post.pictures[post.pictures.length-1].path.substring(0,4) ==='http'">
            <Image :src="post.pictures[post.pictures.length-1].path"  alt="" />
          </div>
          <div v-else>
            <Image :src="this.defaultPicture" alt=""  />
          </div>
        </div>
        <!--<img src="post.picture" style="height: 15rem" alt="kein Bild"/>-->
      </template>
      <template #title>
        {{ post.title }}
      </template>
      <template #subtitle>
        {{ post.service }}

      </template>
      <template #content>
        <p>{{post.short_description}}</p>
      </template>
      <template #footer>
        <Button  label="Details"  @click="routeToPostView(post.id)"></Button>
        <span v-if="currentUser.id">
        <span v-if="saved" class="unsaveButton"><Button icon="pi pi-times-circle" class="p-button-rounded p-button-danger" @click="unsavePost(post.id,currentUser.id)"/></span>
        <span v-else class="saveButton"><Button icon="pi pi-save" class="p-button-rounded p-button-success" @click="savePost(post.id, currentUser.id)"/></span>
      </span>
      </template>
    </Card>
  </div>
</template>

<script>
import {useCurrentUserStore} from "../stores/currentUser";
export default {
  name: "ServicePostCard",
    inject: ["backendurl", "defaultPicture"],
    props: {
      post: Object,
      User: Object,
      saved: Boolean
    },
    emits: ["notify"],
    data(){
      return{
        currentUser: useCurrentUserStore()
      }
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
              this.$emit('notify', true)
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
              this.$emit('notify', true)
            })
            .catch(error => {
              console.log(error)
            });

      },
      routeToPostView(id) { // this pushes it to the component that has the display view details i.e DisplayDetailView.vue
        this.$router.push(`/PostView${id}`)
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
</style>