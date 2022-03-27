import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueGtag from 'vue-gtag'

loadFonts()

// Delete h1 element from the DOM 
const h1 = document.querySelector('h1')
h1?.remove()

createApp(App)
  .use(vuetify)
  .use(VueGtag, {
    config: { id: 'G-JFD8REZ0Q6' },
  })
  .mount('#app')
