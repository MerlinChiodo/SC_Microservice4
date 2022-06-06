<template>
  <h1>whyyy</h1>
  <detailed-post></detailed-post>
</template>

<script>

import detailedPost from "../components/detailedPost.vue";
export default {
  name: "PostView",
  components: {detailedPost},
  created() {
    this.postid = this.$route.params.postid
  }
}
</script>

<style scoped>

</style>