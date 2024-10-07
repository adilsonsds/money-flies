<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSummaryStore } from '@/stores/SummaryStore';

const { getTotal } = useSummaryStore()
const { categories } = useCategoryStore()

const year = new Date().getFullYear()
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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
              name: 'summary-result',
              query: {
                categoryId: category.id,
                month,
                year
              }
            }">
              {{
                getTotal({ year, month, categoryId: category.id }).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).replace('R$', '')
              }}
            </RouterLink>
          </td>
          <td class="text-right">
            {{
              getTotal({ categoryId: category.id }).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).replace('R$', '')
            }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td v-for="month in months" :key="month" class="text-right">
            <RouterLink :to="{
              name: 'summary-result',
              query: {
                year,
                month
              }
            }">
              {{
                getTotal({ year, month }).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).replace('R$', '')
              }}
            </RouterLink>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>
