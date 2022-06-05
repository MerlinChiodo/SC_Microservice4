<template>
<DataView :value="posts" layout='list'>
  <template #list="slotProps">
    <div class="col-12">
      <div class="car-details">
        <div>
          <img :src="'demo/images/car/' + slotProps.data.title + '.png'" :alt="slotProps.data.title"/>
          <div class="grid">
            <div class="col-12">Vin: <b>{{slotProps.data.title}}</b></div>
            <div class="col-12">Year: <b>{{slotProps.data.service}}</b></div>
            <div class="col-12">Brand: <b>{{slotProps.data.short_description}}</b></div>
          </div>
        </div>
        <Button icon="pi pi-search"></Button>
      </div>
    </div>
  </template>
</DataView>
</template>

<script>
import {getAllServicePosts} from '../controllers/postController'
export default {
  name: "postCard",
  data() {
    return {
      posts: [],
      layout: 'list'
    }
  },
  postService: null,

  created() {
    this.posts = getAllServicePosts()
  },
  methods: {
    }

}
</script>

<style scoped>

</style>