<template>
<div v-if="post">
<user-post-card  :post="post" />
</div>
</template>

<script>
import UserPostCard from '../components/UserPostCard.vue'

export default {
  name: "UserPostView",
  components: {UserPostCard},

    data() {
      return {
        post: {
          title: 'Understanding Props in vuejs'
        }
      }
    },
    //...
  }
</script>

<style scoped>

</style>