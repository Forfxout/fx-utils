import { createApp } from 'vue'
import App from './App.vue'

// Styling
import './assets/css/tailwind.css'

import './registerServiceWorker'

import router from './router'

import store from './store'

createApp(App).use(store).use(router).mount('#app')
