<script setup lang="ts">
import { useAccountStore } from '@/stores/AccountStore';
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSummaryStore } from '@/stores/SummaryStore'
import type { SummaryFilter } from '@/types/Summary'

const { getTotal, listPeriods } = useSummaryStore()
const { categories } = useCategoryStore()
const { accounts } = useAccountStore()

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
          <th>#</th>
          <th v-for="(period, index) in periods" :key="index" style="width: 75px">
            {{ period.month }}/{{ period.year }}
          </th>
          <th style="width: 75px">Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="14">
            Categorias
          </td>
        </tr>
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
        <tr>
          <td colspan="14">
            Contas
          </td>
        </tr>
        <tr v-for="account in accounts" :key="account.id">
          <td>{{ account.name }}</td>
          <td v-for="(period, index) in periods" :key="index" class="text-right">
            <RouterLink :to="{
              name: 'transactions',
              query: {
                accountId: account.id,
                month: period.month,
                year: period.year
              }
            }">
              {{ getFormatedTotal({ year: period.year, month: period.month, accountId: account.id }) }}
            </RouterLink>
          </td>
          <td class="text-right">
            {{ getFormatedTotal({ accountId: account.id }) }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
