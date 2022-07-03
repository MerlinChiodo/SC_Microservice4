<template>
  <div id="wrapper">
  <h1>Erstelle einen neuen Post!</h1>
  <update-post-form/>
  </div>
</template>

<script>

import UpdatePostForm from "../components/UpdatePostForm.vue";
export default {

  name: "UpdatePostView",
  components: {UpdatePostForm}
}
</script>

<style scoped>
#wrapper{
  margin:auto;
  max-width:80rem;
}
</style>