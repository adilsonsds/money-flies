<script setup lang="ts">
import { useActivityStore } from '@/stores/ActivityStore';
import { useCategoryStore } from '@/stores/CategoryStore';

type Period = {
  startDate: Date;
  endDate: Date;
};

const { getTotal } = useActivityStore()
const { categories } = useCategoryStore()

const year = new Date().getFullYear();
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const periods: Period[] = months.map(month => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { startDate, endDate };
})

console.log(periods)

</script>

<template>
  <main>
    <h1>Summary</h1>
    <RouterLink to="/activities/new">New Activity</RouterLink>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th v-for="period in periods" :key="period.startDate.toISOString()" style="width: 75px;">
            {{ period.startDate.getMonth() + 1 }}/{{ period.startDate.getFullYear() }}
          </th>
          <th style="width: 75px;">Sum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td v-for="period in periods" :key="period.startDate.toISOString()" class="text-right">
            {{ getTotal(period.startDate, period.endDate, category.id).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }) }}
          </td>
          <td class="text-right">
            {{ getTotal(undefined, undefined, category.id).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }) }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
