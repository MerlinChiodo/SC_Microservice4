<template>
    <div v-if="this.pictures[this.pictures.length-1]">
      <Image :src="this.pictures[this.pictures.length-1].path" alt="Image" width="800" />
    </div>
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
  <div >
    <label for="event_on">Termin</label><br>
    <Calendar id="event_on" v-model="event_on" autocomplete="off" />
  </div>
  <div>
    <label for="category">Kategorie</label><br>
    <Dropdown id="category" v-model="category" :options="categories" optionLabel="label" optionValue="value"  />
  </div>
  <div v-if="checkShowCategorySubject(category)">
    <label for="category_subject">Um was gehts genau?</label><br>
    <Dropdown id="category_subject" v-model="category_subject" :options="categories_Subjects" optionLabel="label" optionValue="value"  />
  </div>
    <div><label for="pictureUpload">Füge deinem Post Bilder hinzu</label><br>
      <FileUpload id="pictureUpload" name="pictures" :url="this.backendurl + 'pictures/createPictures/' +this.postId"  :multiple="true" accept="image/*" >
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
    </div>

  <Button label="Post ändern" @click="updatePost (postId, title, shortDescription,longDescription, event_on, category, category_subject)"/>
</template>

<script>
import {updatePost} from '../controllers/postController.js'
import {useCurrentUserStore} from "../stores/currentUser";
export default {
  name: "UpdatePostForm.vue",
  inject: ["backendurl"],
  data() {
    return {
      test: "test",
      currentUser: useCurrentUserStore(),
      postId: null,
      title: "",
      longDescription: "",
      shortDescription: "",
      event_on: "",
      category: "",
      category_subject: "",
      pictures: [],
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
  async beforeMount() {
    await this.getData();
    await this.getPictures();
    console.log("hi" ,this.pictures)

  },
  methods: {
    updatePost,
    getData() {
      const options = {
        method: 'GET'
      };
      fetch(this.backendurl + `posts/${this.$route.params.postid}`, options)
          .then((response) => response.json())
          .then((data) => {
            this.postId = data.id
            this.title= data.title
                this.longDescription= data.long_description
                this.shortDescription= data.short_description
                this.event_on= data.event_on
                this.category= data.category
                this.category_subject= data.category_subject
          })
          .catch(error => {
            console.log(error)
          });
    },
    getPictures (){
      const options = {
        method: 'GET'
      };
      fetch(this.backendurl + `pictures/getAllPictures/${this.$route.params.postid}`, options)
      .then((response) => response.json())
    .then((data) => {

      for(let i in data){
        this.pictures.push({
              "path": this.backendurl + `pictures/${data[i].id}`
            }
          )

      }
      console.log(this.pictures)


    })
    .catch(error => {
      console.log(error)
    });
    },
    checkShowCategorySubject: function (value) {
      if (value === 'SUCHE' || value === 'BIETE') {
        return true;
      }
      return false;
    },
  },
}
</script>

<style scoped>



</style>