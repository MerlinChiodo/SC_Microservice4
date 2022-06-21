<template>
  <h1>Erstelle einen neuen Post!</h1>
  <new-post-form/>
</template>

<script>

import NewPostForm from "../components/newPostForm.vue";
export default {

  name: "NewPost",
  components: {NewPostForm}
}
</script>

<style scoped>

</style>