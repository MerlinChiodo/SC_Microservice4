<template>
<user-post-card v-bind="post" ></user-post-card>
</template>

<script>
import UserPostCard from '../components/UserPostCard.vue'

export default {
  name: "UserPostView",
  components: {UserPostCard},
  data() {
    return{
      post: {
        title: "Dies ist ein titel",
        short_description: "kurze Beschreibung"
      }
    }
  }
}
</script>

<style scoped>

</style>