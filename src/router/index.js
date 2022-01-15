import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/payoneer',
    name: 'Payoneer Calculator',
    component: () => import('../views/Payoneer.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
