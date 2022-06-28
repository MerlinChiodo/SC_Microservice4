import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import VueCookies from "vue-cookies";

//import "primevue/resources/themes/md-light-deeppurple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import "primevue/resources/themes/mdc-light-indigo/theme.css";


//import Menubar from 'primevue/menubar'
import navBar from 'primevue/tabmenu';
import inputText from 'primevue/inputtext';
import textarea from 'primevue/textarea';
import button from 'primevue/button';
import dataView from 'primevue/dataview';
import dataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import panel from 'primevue/panel';
import dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(VueCookies);



//app.provide("backendurl", "http://localhost:3001/");
//app.provide("frontendurl", "http://localhost:3000/");
app.provide("frontendurl", "http://vps2290194.fastwebserver.de:9740/");
app.provide("backendurl", "http://" + location.host + "/");
app.provide("smartAuthUrl", "http://vps2290194.fastwebserver.de:9760/");

app.component('TabMenu', navBar)
app.component('InputText', inputText)
app.component('Textarea', textarea)
app.component('Button', button)
app.component('DataView', dataView)
app.component('DataViewLayoutOptions', dataViewLayoutOptions)
app.component('Panel', panel)
app.component('Dropdown', dropdown)
app.component('Card', Card)
app.component('Calendar', Calendar)

app.mount('#app')

