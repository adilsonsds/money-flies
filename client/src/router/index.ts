import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesView.vue')
    },
    {
      path: '/activities/new',
      name: 'activities-new',
      component: () => import('@/views/ActivitiesRegisterView.vue')
    },
    {
      path: '/activities/:id',
      name: 'activities-edit',
      component: () => import('@/views/ActivitiesRegisterView.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('@/views/TransactionsView.vue')
    },
    {
      path: '/backup',
      name: 'backup',
      component: () => import('@/views/BackupView.vue')
    }
  ]
})

export default router
