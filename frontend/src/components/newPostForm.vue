<template>
  <div>
    <span >
      <label for="title">Überschrift</label><br>
      <InputText id="title" type="text" v-model="title" />

  </span>
  </div>
  <div>
  <span>
  <label for="shortDescription">Kurzbeschreibung</label><br>
  <Textarea v-model="shortDescription" rows="5" cols="30" :autoResize="true" id="shortDescription"/>
    </span>
  </div>
  <div>
  <span>
  <label for="longDescription">Langbeschreibung</label><br>
  <Textarea v-model="longDescription" rows="5" cols="30" :autoResize="true" id="longDescription"/>
  </span>
  </div>
  <div class="field col-12 md:col-4">
    <label for="event_on">Termin</label><br>
    <Calendar id="event_on" v-model="event_on" autocomplete="off" />
  </div>
  <Button label="Post erstellen" @click="createPost (this.tempUser, title, shortDescription,longDescription, event_on, category, category_subject)"/>
</template>

<script>
import {createPost} from '../controllers/postController.js'
export default {
  name: "newPostForm",
  inject: ["backendurl", "tempUser"],
  data() {
    return {
      title: "",
      longDescription: "",
      shortDescription: "",
      event_on: "",
      category: "",
      category_subject: ""
    };
  },
  methods: {
    createPost
  },
}
</script>

<style scoped>
div{
  margin-top:10px;
  margin-bottom:10px
}
span{
  margin-top:10px;
  margin-bottom:10px
}
</style>