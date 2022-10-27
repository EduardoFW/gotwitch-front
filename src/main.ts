import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueGtag from 'vue-gtag'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


loadFonts()

createApp(App)
  .use(vuetify)
  .use(Toast)
  .use(VueGtag, {
    config: { id: 'G-JFD8REZ0Q6' },
  })
  .mount('#app')
