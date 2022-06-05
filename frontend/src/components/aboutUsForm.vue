<template>
  <label for="aboutUsText">About Us</label><br>
  <Textarea v-model="aboutUsText" rows="5" cols="30" :autoResize="true" id="aboutUsText"/>

  <span class="p-float-label">
    <InputText id="service" type="text" v-model="service" />
    <label for="service">Service-Link</label>
  </span>
  <span class="p-float-label">
    <InputText id="picture" type="text" v-model="picture" />
    <label for="picture">Bild-Link</label>
  </span>

</template>

<script>
export default {
  name: "aboutUsForm"
}
</script>

<style scoped>

</style>