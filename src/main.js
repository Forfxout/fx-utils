import { createApp } from 'vue'
import App from './App.vue'

// Styling
import './assets/css/index.css'

import './registerServiceWorker'

import router from './router'

import store from './store'
import './assets/tailwind.css'

createApp(App).use(store).use(router).mount('#app')
