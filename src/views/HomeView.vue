<script setup lang="ts">
import { useActivityStore } from '@/stores/ActivityStore'
import { useCategoryStore } from '@/stores/CategoryStore'
import type { SummaryPeriod } from '@/types/Summary'

const { getTotal } = useActivityStore()
const { categories } = useCategoryStore()

const year = new Date().getFullYear()
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const periods: SummaryPeriod[] = months.map((month) => {
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999)
  return { start, end }
})
</script>

<template>
  <main>
    <h1>Summary</h1>
    <div class="header-links">
      <RouterLink class="header-links__item" to="/activities/new">New Activity</RouterLink>
      <RouterLink class="header-links__item" to="/categories">My Categories</RouterLink>
      <RouterLink class="header-links__item" to="/backup">Backup</RouterLink>
    </div>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th v-for="period in periods" :key="period.start.toISOString()" style="width: 75px">
            {{ period.start.getMonth() + 1 }}/{{ period.start.getFullYear() }}
          </th>
          <th style="width: 75px">Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td v-for="period in periods" :key="period.start.toISOString()" class="text-right">
            <RouterLink
              :to="{
                name: 'transactions',
                query: {
                  category: category.id,
                  start: period.start.toLocaleDateString('en-CA'),
                  end: period.end.toLocaleDateString('en-CA')
                }
              }"
            >
              {{
                getTotal({ period, categoryId: category.id }).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
              }}
            </RouterLink>
          </td>
          <td class="text-right">
            <RouterLink
              :to="{
                name: 'transactions',
                query: {
                  category: category.id
                }
              }"
            >
              {{
                getTotal({ categoryId: category.id }).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
              }}
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
