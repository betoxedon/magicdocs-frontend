import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Editor from '@tinymce/tinymce-vue'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
const app = createApp(App)
library.add(fas, fab, far)

const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.use(VueTheMask)
app.mount('#app')

const options = {
  transition: 'Vue-Toastification__fade',
  maxToasts: 20,
  newestOnTop: true
}

app.use(Toast, options)
app.component('TinyEditor', Editor)
