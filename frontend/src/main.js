import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

//import Menubar from 'primevue/menubar'
import TabMenu from 'primevue/tabmenu';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('MenuBar', TabMenu)

app.mount('#app')
