<template>
  <TabMenu :model="items" >
    <router-view/>

  </TabMenu>



</template>

<script>
import {useCurrentUserStore} from "../stores/currentUser";

export default {
  name: "navBar",
  data() {
    return {
      currentUser: useCurrentUserStore(),
      items: [
        {label: 'News', icon: 'pi pi-fw pi-home', to: '/'},
        {label: 'Schwarzes Brett', icon: 'pi pi-fw pi-calendar', to: '/schwarzesBrett'},
        {label: 'Meine Posts', icon: 'pi pi-fw pi-pencil', to: '/meinePosts', visible:()=>Boolean(this.currentUser.id)},
        {label: 'Vermerkte Posts', icon: 'pi pi-fw pi-file', to: '/vermerktePosts', visible:()=>Boolean(this.currentUser.id)},
        //{label: 'send about us', icon: 'pi pi-fw pi-user', to: '/sendAboutUs'},
        //{label: 'testEvents', icon: 'pi pi-fw pi-cog', to: '/testEvents'}
      ]
    }

  }
}
</script>


<style>

</style>