<template>
  <div v-if="post">
    {{post.title}}
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
}
</script>

<style scoped>

</style>