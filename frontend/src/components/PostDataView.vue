<template>
  <div class="card">
    <DataView :value="posts" :layout="layout" :paginator="true" :rows="9" >
      <template #header>

      </template>


      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="post-grid-item card">
            <div class="post-grid-item-top">
              <div>
                <span class="post-service">Service: {{slotProps.data.service}}</span>
              </div>
              <!--<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>-->
            </div>
            <div class="post-grid-item-content">
              <!--<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.title"/>-->
              <div class="post-title">Titel: {{slotProps.data.title}}</div>

            </div>
            <div class="post-grid-item-bottom">
              <div class="post-short_description">kurze Beschreibung: {{slotProps.data.short_description}}</div>
              <Button  label="Details" :disabled="slotProps.data.long_description === ''" @click="routeToPostView(slotProps.data.id)"></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
const backendurl = "http://localhost:3001/";
//const backendurl = "http://" + location.host + "/" ;
export default {
  name: "PostDataView",
  data() {
    return {
      posts: null,
      layout: 'grid',

    }
  },
  mounted: function(){
    this.getServicePosts();
  },
  methods: {
    getServicePosts(){
      const options = {
        method: 'GET'
      };
      fetch(backendurl + "posts/getAllServicePosts", options)
          .then((response) => response.json())
          .then((data) => {
            console.log("hi")
            this.posts = data
          })
          .catch(error => {console.log(error)});
    },
    routeToPostView(id) { // this pushes it to the component that has the display view details i.e DisplayDetailView.vue
      this.$router.push(`/postView${id}`)
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