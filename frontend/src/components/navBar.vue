<template>
  <TabMenu :model="items" />
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      items: [
        {label: 'News', icon: 'pi pi-fw pi-home', to: '/'},
        {label: 'Schwarzes Brett', icon: 'pi pi-fw pi-calendar', to: '/schwarzesBrett'},
        {label: 'Meine Posts', icon: 'pi pi-fw pi-pencil', to: '/meinePosts'},
        {label: 'Vermerkte Posts', icon: 'pi pi-fw pi-file', to: '/vermerktePosts'},
        {label: 'send about us', icon: 'pi pi-fw pi-user', to: '/sendAboutUs'},
        //{label: 'testEvents', icon: 'pi pi-fw pi-cog', to: '/testEvents'}
      ]
    }
  }
}
</script>

<style>

</style>