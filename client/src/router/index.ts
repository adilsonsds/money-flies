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
      path: '/payers',
      name: 'payers',
      component: () => import('@/views/PayersView.vue')
    },
    {
      path: '/activities/new',
      name: 'activities-new',
      component: () => import('@/views/ActivityNewView.vue')
    },
    {
      path: '/activities/:id',
      name: 'activities-edit',
      component: () => import('@/views/ActivityEditView.vue')
    },
    {
      path: '/summary',
      name: 'summary-result',
      component: () => import('@/views/SummaryResultView.vue')
    },
    {
      path: '/backup',
      name: 'backup',
      component: () => import('@/views/BackupView.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('@/views/TransactionsView.vue'),
      children: [
        {
          path: 'new',
          name: 'transactions-new',
          component: () => import('@/views/TransactionsNewView.vue')
        }
      ]
    }
  ]
})

export default router
