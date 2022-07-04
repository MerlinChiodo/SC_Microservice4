<template>
  <Card id="wrapper" class="shadow-3">
    <template #header>
    </template>
    <template #title>
      <div >
        <div >
          <div class="mb-3" >
            <span >
              <div >
              <label for="title" class=" text-xl">Überschrift</label><br>
              </div>
              <InputText id="title" type="text" v-model="title" />
            </span>
          </div>
          <div class="mb-3 ">
            <div>
              <div >
                <label for="category" class=" text-xl">Kategorie</label><br>
              <Dropdown id="category" v-model="category" :options="categories" optionLabel="label" optionValue="value"  />
              </div>
            </div>
            <div v-if="checkShowCategorySubject(category)">
              <label for="category_subject" class=" text-xl">Was</label><br>
              <Dropdown id="category_subject" v-model="category_subject" :options="categories_Subjects" optionLabel="label" optionValue="value"  />
            </div>
          </div>
          <div >
            <label for="event_on" class=" text-xl">Termin</label><br>
          </div>
          <div >

            <Calendar id="event_on" v-model="event_on" autocomplete="off" />
          </div>
        </div>
      </div>
    </template>
    <template #content>
      <div class="mb-3">
        <span>
          <label for="shortDescription" class=" text-xl">Kurzbeschreibung</label><br>
          <Textarea v-model="shortDescription" rows="4" cols="80" :autoResize="true" id="shortDescription"/>
        </span>
      </div>
      <div class="mb-3">
        <span>
          <label for="longDescription" class=" text-xl">Langbeschreibung</label><br>
          <Textarea v-model="longDescription" rows="5" cols="80" :autoResize="true" id="longDescription"/>
        </span>
      </div>
      <Button label="Post erstellen" @click="finishPostCreation(this.currentUser.id, title, shortDescription,longDescription, event_on, category, category_subject)"/>
    </template>
  </Card>
</template>

<script>
import {createPost} from '../controllers/postController.js'
import {useCurrentUserStore} from "../stores/currentUser";
export default {
  name: "newPostForm",
  inject: ["backendurl"],
  data() {
    return {
      currentUser: useCurrentUserStore(),
      title: "",
      longDescription: "",
      shortDescription: "",
      event_on: "",
      category: "",
      category_subject: "",
      categories: [
        {label: "", value: ""},
        {label: "SUCHE", value: "SUCHE"},
        {label: "BIETE",value: "BIETE"}  ,
        {label: "FRAGE",value: "FRAGE"},
        {label: "VERANSTALTUNG",value: "VERANSTALTUNG"},
        {label: "MITTEILUNG",value: "MITTEILUNG"}
          ],
      categories_Subjects: [
        {label: "", value: ""},
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
    createPost,
    finishPostCreation: function (user_id, title, short_description, long_description, event_on, category, category_subject) {
      createPost(user_id, title, short_description, long_description, event_on, category, category_subject).then(data => {
        this.$router.push(`/meinePosts`)
      })
    },
    checkShowCategorySubject: function (value) {
      if (value === 'SUCHE' || value === 'BIETE') {
        return true;
      }
      return false;
    },
  }
}
</script>

<style scoped>

#wrapper{
  margin:auto;
  max-width:80%;
}
</style>