<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { SummaryFilter, SummaryResultItem } from '@/types/Summary'
import { ref } from 'vue';
import Api from '@/api';

const route = useRoute()
const router = useRouter()

const getFilter = (): SummaryFilter => {
  return {
    year: route.query.year ? parseInt(String(route.query.year)) : new Date().getFullYear(),
    month: route.query.month ? parseInt(String(route.query.month)) : new Date().getMonth() + 1,
    categoryId: route.query.categoryId ? parseInt(String(route.query.categoryId)) : undefined,
    payerId: route.query.payerId ? parseInt(String(route.query.payerId)) : undefined
  }
}

const resultItens = ref<SummaryResultItem[]>([])

async function loadResult() {
  const result = await Api.summaries.filterResults(getFilter())
  resultItens.value = result
}

loadResult()
</script>
<template>
  <h1>TransactionsView</h1>
  <button @click="router.go(-1)" style="margin: 10px 0 20px">Voltar</button>
  <table>
    <thead>
      <tr>
        <th style="width: 120px">Data</th>
        <th style="width: 300px">Atividade</th>
        <th style="width: 180px">Categoria</th>
        <th style="width: 120px">Valor</th>
        <th style="width: 90px">Pago?</th>
        <th>Descrição</th>
        <th>Payer</th>
        <th style="width: 30px"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in resultItens" :key="result.id">
        <td>{{ result.date }}</td>
        <td>{{ result.activity.title }}</td>
        <td>{{ result.category.name }}</td>
        <td class="text-right">
          {{
            result.amount.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
          }}
        </td>
        <td>{{ result.paid ? 'Sim' : 'Não' }}</td>
        <td>{{ result.description }}</td>
        <td>{{ result.payer.name }}</td>
        <td>
          <RouterLink :to="{ name: 'activities-edit', params: { id: result.activity.id } }">
            Editar
          </RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>
