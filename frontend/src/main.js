import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import "primevue/resources/themes/md-light-deeppurple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/mdc-light-indigo/theme.css";

//import Menubar from 'primevue/menubar'
import navBar from 'primevue/tabmenu';
import inputText from 'primevue/inputtext';
import textarea from 'primevue/textarea';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('TabMenu', navBar)
app.component('InputText', inputText)
app.component('Textarea', textarea)

app.mount('#app')

//primeflex, irgendwas mit icons, bie getting started gucken
