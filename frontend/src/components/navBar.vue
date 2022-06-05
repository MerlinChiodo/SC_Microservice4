<template>
  <TabMenu :model="items" />
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      items: [
        {label: 'News', icon: 'pi pi-fw pi-home'},
        {label: 'Schwarzes Brett', icon: 'pi pi-fw pi-calendar'},
        {label: 'Meine Posts', icon: 'pi pi-fw pi-pencil'},
        {label: 'Vermerkte Posts', icon: 'pi pi-fw pi-file'},
        {label: 'send about us', icon: 'pi pi-fw pi-cog', to: '/sendAboutUs'},
        {label: 'testEvents', icon: 'pi pi-fw pi-cog', to: '/testEvents'}
      ]
    }
  }
}
</script>

<style>

</style>