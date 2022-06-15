<template>
<div>
  <Card style="width: 25em">
    <template #header>
      <img src="post.picture" style="height: 15rem" alt="kein Bild"/>
    </template>
    <template #title>
      {{ post.title }}
    </template>
    <template #subtitle>
      {{ post.category }}
      <div v-if="checkShowCategorySubject(post.category)">{{ post.category_subject }}</div>

    </template>
    <template #content>
      <p>{{post.short_description}}</p>
    </template>
    <template #footer>
      <Button  label="Details"  style="margin-left: .5em" />

    </template>
  </Card>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },

  methods: {
    checkShowCategorySubject: function (value) {
      if(value === 'SUCHE' || value == 'BIETE') {
        return true;
      }
      return false;
    }
  },

}
</script>

<style scoped>

</style>