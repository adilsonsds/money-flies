<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSummaryStore } from '@/stores/SummaryStore'
import type { SummaryFilter } from '@/types/Summary'

const { getTotal } = useSummaryStore()
const { categories } = useCategoryStore()

const year = new Date().getFullYear()
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const getFormatedTotal = (filter: SummaryFilter) => {
  return getTotal(filter).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).replace('R$', '')
}

</script>

<template>
  <main>
    <h1>Summary</h1>
    <div class="header-links">
      <RouterLink class="header-links__item" to="/transactions">Recents transactions</RouterLink>
      <RouterLink class="header-links__item" to="/categories">My Categories</RouterLink>
    </div>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th v-for="month in months" :key="month" style="width: 75px">
            {{ month }}/{{ year }}
          </th>
          <th style="width: 75px">Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td v-for="month in months" :key="month" class="text-right">
            <RouterLink :to="{
              name: 'transactions',
              query: {
                categoryId: category.id,
                month,
                year
              }
            }">
              {{ getFormatedTotal({ year, month, categoryId: category.id }) }}
            </RouterLink>
          </td>
          <td class="text-right">
            {{ getFormatedTotal({ categoryId: category.id }) }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td v-for="month in months" :key="month" class="text-right">
            <RouterLink :to="{
              name: 'transactions',
              query: {
                year,
                month
              }
            }">
              {{ getFormatedTotal({ year, month }) }}
            </RouterLink>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>
