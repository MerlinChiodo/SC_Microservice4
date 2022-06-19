<template>
<div>
  <Card style="width: 25em" class="card">
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
      <span v-if="checkIfpostSaved(post.id)" class="saveButton"><Button icon="pi pi-save" class="p-button-rounded p-button-success" @click="savePost(post.id)"/></span>
      <span v-else class="unsaveButton"><Button icon="pi pi-times-circle" class="p-button-rounded p-button-danger" @click="unsavePost(post.id)"/></span>


    </template>
  </Card>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    User: Object
  },

  methods: {
    checkShowCategorySubject: function (value) {
      if (value === 'SUCHE' || value == 'BIETE') {
        return true;
      }
      return false;
    },
    savePost: function(postId){

    },
    unsavePost: function(postId){

    },
    checkIfpostSaved(postId){
      return true
    }
  },

}
</script>

<style scoped>
.saveButton{
  float: right;

}

.card{
  text-align: center;
}

</style>