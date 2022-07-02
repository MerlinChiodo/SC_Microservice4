<template>
  <div>
    <Card style="width: 25em" class="card">
      <template #header>
        <div style="width:80%; margin:auto; margin-top:0.5em">
          <div v-if="this.pictures[0]">
            <Image :src="this.pictures[0].path" alt="Image"  />
          </div>
          <div v-else>
            <Image src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png" alt="Image"  />
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
  inject: ["backendurl"],
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
    this.getPictures()
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
    },
    getPictures (){
      const options = {
        method: 'GET'
      };
      fetch(this.backendurl + `pictures/getAllPictures/${this.post.id}`, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            for(let i in data){
              this.pictures.push({
                    "path": this.backendurl + `pictures/${data[i].id}`
                  }
              )
            }
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