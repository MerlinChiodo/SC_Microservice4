<template>
  <div>
    <Card style="width: 25em">
      <template #header>
        <img src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png" style="height: 15rem" />
      </template>
      <template v-if="post" #title>
        {{post.title || "not yet"}}
      </template>
      <template #subtitle>
        Card subtitle
      </template>
      <template v-if="post" #content>
        <p>{{post.short_description|| "not yet"}}</p>
      </template>
      <template #footer>
        <Button label="Details" />

      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "UserPostCard",
  props:{
    post: Object

  }
}
</script>

<style scoped>

</style>