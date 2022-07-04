<template>
  <div id="wrapper">
  <h1>Erstelle einen neuen Post!</h1>
  <new-post-form/>
  </div>
</template>

<script>

import NewPostForm from "../components/newPostForm.vue";
export default {

  name: "NewPost",
  components: {NewPostForm}
}
</script>

<style scoped>
#wrapper{
  margin:auto;
  max-width:90%;
}
</style>