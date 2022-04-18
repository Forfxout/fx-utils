import { createApp } from 'vue'
import App from './App.vue'

// Styling
import 'animate.css'
import './assets/css/tailwind.css'
import './assets/css/vue3-animate.css'

import './registerServiceWorker'

import router from './router'

import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
