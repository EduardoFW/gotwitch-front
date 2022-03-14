import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueGtag from 'vue-gtag'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(VueGtag, {
    config: { id: 'G-JFD8REZ0Q6' },
  })
  .mount('#app')
