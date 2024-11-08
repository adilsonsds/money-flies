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
      path: '/accounts',
      name: 'accounts',
      component: () => import('@/views/AccountsView.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('@/views/TransactionsView.vue'),
      children: [
        {
          path: 'new',
          name: 'transactions-create',
          component: () => import('@/views/TransactionsModalCreateView.vue')
        },
        {
          path: 'edit/:id',
          name: 'transactions-edit',
          component: () => import('@/views/TransactionsModalEditView.vue')
        }
      ]
    }
  ]
})

export default router
