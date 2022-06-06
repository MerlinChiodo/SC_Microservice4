<template>
  <label for="aboutUsText">About Us</label><br>
  <Textarea v-model="aboutUsText" rows="5" cols="30" :autoResize="true" id="aboutUsText"/>

  <span class="p-float-label">
    <InputText id="url" type="text" v-model="url" />
    <label for="url">Service-Link</label>
  </span>
  <span class="p-float-label">
    <InputText id="picture" type="text" v-model="picture" />
    <label for="picture">Bild-Link</label>
  </span>
  <Button label="Senden" @click=" sendAboutUsEvent (new Date().toISOString(), aboutUsText, picture, url)"/>

</template>

<script>
import {sendAboutUsEvent} from '../controllers/sendAboutUsController'
export default {
  name: "aboutUsForm",
  data() {
    return {
      picture: "",
      url: "",
      aboutUsText: "",
    };
  },
  methods: {
    sendAboutUsEvent
  },
}
</script>

<style scoped>

</style>