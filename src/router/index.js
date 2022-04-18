import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/app',
    name: 'App',
    component: () => import('../views/AppLayout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
