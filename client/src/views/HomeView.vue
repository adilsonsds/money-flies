<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSummaryStore } from '@/stores/SummaryStore'
import type { SummaryFilter } from '@/types/Summary'

const { getTotal, listPeriods } = useSummaryStore()
const { categories } = useCategoryStore()

const periods = listPeriods()

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
      <RouterLink class="header-links__item" to="/transactions">Lançamentos recentes</RouterLink>
      <RouterLink class="header-links__item" to="/categories">Categorias</RouterLink>
      <RouterLink class="header-links__item" to="/accounts">Contas</RouterLink>
    </div>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th v-for="(period, index) in periods" :key="index" style="width: 75px">
            {{ period.month }}/{{ period.year }}
          </th>
          <th style="width: 75px">Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td v-for="(period, index) in periods" :key="index" class="text-right">
            <RouterLink :to="{
              name: 'transactions',
              query: {
                categoryId: category.id,
                month: period.month,
                year: period.year
              }
            }">
              {{ getFormatedTotal({ year: period.year, month: period.month, categoryId: category.id }) }}
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
          <td v-for="(period, index) in periods" :key="index" class="text-right">
            <RouterLink :to="{
              name: 'transactions',
              query: {
                month: period.month,
                year: period.year
              }
            }">
              {{ getFormatedTotal({ year: period.year, month: period.month }) }}
            </RouterLink>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>
