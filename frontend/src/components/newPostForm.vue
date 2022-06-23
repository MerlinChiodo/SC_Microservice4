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
  <div class="field col-12 md:col-4">
    <label for="event_on">Termin</label><br>
    <Calendar id="event_on" v-model="event_on" autocomplete="off" />
  </div>
  <div>
    <label for="category">Kategorie</label><br>
    <Dropdown id="category" v-model="category" :options="categories" optionLabel="label" optionValue="value"  />
  </div>
  <div v-if="category!=''">
    <label for="category_subject">Um was gehts genau?</label><br>
    <Dropdown id="category_subject" v-model="category_subject" :options="categories_Subjects" optionLabel="label" optionValue="value"  />
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
      category_subject: "",
      categories: [
          {label: "SUCHE", value: "SUCHE"},
        {label: "BIETE",value: "BIETE"}  ,
        {label: "FRAGE",value: "FRAGE"},
        {label: "VERANSTALTUNG",value: "VERANSTALTUNG"},
        {label: "MITTEILUNG",value: "MITTEILUNG"}
          ],
      categories_Subjects: [
        {label: "BUCH", value: "BUCH"},
        {label: "JOB",value: "JOB"}  ,
        {label: "MUSIK",value: "MUSIK"},
        {label: "ELEKTRONIK",value: "ELEKTRONIK"},
        {label: "IMMOBILIE",value: "IMMOBILIE"},
        {label: "KINDERZUBEHOER",value: "KINDERZUBEHOER"},
        {label: "TIER",value: "TIER"},
        {label: "KLEIDUNG",value: "KLEIDUNG"},
        {label: "HAUSHALT",value: "HAUSHALT"}
      ]
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