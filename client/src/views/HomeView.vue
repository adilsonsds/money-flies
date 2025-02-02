<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSummaryStore } from '@/stores/SummaryStore'
import { useAccountStore } from '@/stores/AccountStore'
import type { SummaryFilter, SummaryPeriod } from '@/types/Summary'
import type { Category } from '@/types/Transaction';
import { ref } from 'vue';

const { getTotal, listPeriods } = useSummaryStore()
const { categories } = useCategoryStore()
const { accounts } = useAccountStore()

const periods = listPeriods()

const getFormatedTotal = (filter: SummaryFilter) => {
  return getFormatedValue(getTotal(filter))
}

const getFormatedValue = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).replace('R$', '')
}

enum SummaryType {
  Inflow = 'inflow',
  Outflow = 'outflow',
  NotIdentified = 'notIdentified'
}

type CategoryGroup = {
  id: number
  name: string
  type: SummaryType
  inflowsCategories: Category[]
  outflowsCategories: Category[]
}

const selectedAccountId = ref<number>(1)

const groups = ref<CategoryGroup[]>([])

function addGroup(name: string, type: SummaryType, inflows: string[], outflows: string[]) {

  var inflowsCategories = categories.filter(c => inflows.includes(c.name))
  var outflowsCategories = categories.filter(c => outflows.includes(c.name))

  var nextId = groups.value.length + 1

  groups.value.push({
    id: nextId,
    name,
    type,
    inflowsCategories: inflowsCategories || [],
    outflowsCategories: outflowsCategories || []
  })
}

addGroup('Despesas domésticas', SummaryType.Outflow, ['Aluguel', 'Gás', 'Luz', 'Internet', 'Água', 'Petshop'], ['Ajuda de custo'])
addGroup('Alimentação', SummaryType.Outflow, ['Mercado', 'Restaurantes', 'Lanches'], [])
addGroup('Transporte', SummaryType.Outflow, ['Uber, 99 e Táxis', 'Ônibus e metrô'], [])
addGroup('Carreira e Educação', SummaryType.Outflow, ['Cursos', 'Livros', 'Papelaria'], [])
addGroup('Receitas', SummaryType.Inflow, ['Salário', 'Rendimentos'], [])
addGroup('Financiamentos', SummaryType.Outflow, ['Financiamentos'], [])
addGroup('Estilo de Vida', SummaryType.Outflow, ['Assinaturas', 'Celular', 'Compras', 'Presentes', 'Viagens'], [])
addGroup('Saúde e Bem-estar', SummaryType.Outflow, ['Dentista', 'Farmácia', 'Barbearia'], [])

var categoriesWithoutGroup = categories.filter(c => !groups.value.some(g => g.inflowsCategories.includes(c) || g.outflowsCategories.includes(c)))
addGroup('Outros', SummaryType.NotIdentified, categoriesWithoutGroup.map(c => c.name), [])

function getCategoryGroupTotal(group: CategoryGroup, period: SummaryPeriod): number {
  var total = 0

  group.inflowsCategories.forEach(category => {
    total += getTotal({ year: period.year, month: period.month, categoryId: category.id, accountId: selectedAccountId.value })
  })

  group.outflowsCategories.forEach(category => {
    total -= getTotal({ year: period.year, month: period.month, categoryId: category.id, accountId: selectedAccountId.value })
  })

  return total
}

function getCategoryGroupTotalFormated(group: CategoryGroup, period: SummaryPeriod): string {
  return getCategoryGroupTotal(group, period).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).replace('R$', '')
}

function getSummaryTotalFormated(period: SummaryPeriod): string {
  var inflowTotal = getSummaryTotalByType(SummaryType.Inflow, period)
  var outflowTotal = getSummaryTotalByType(SummaryType.Outflow, period)

  var total = inflowTotal - outflowTotal

  return total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).replace('R$', '')
}

function getSummaryTotalByType(type: SummaryType, period: SummaryPeriod): number {
  var total = 0

  groups.value.forEach(group => {
    if (group.type === type)
      total += getCategoryGroupTotal(group, period)
  })

  return total
}

function getVisibleCategoriesGroupsInSummary(): CategoryGroup[] {
  return groups.value.filter(group => group.type !== SummaryType.NotIdentified)
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

    <div>
      <select v-model="selectedAccountId">
        <option v-for="account in accounts" :key="account.id" :value="account.id">
          {{ account.name }}
        </option>
      </select>
    </div>

    <table>

      <tr>
        <td>Resumo</td>
        <td v-for="(period, index) in periods" :key="index" class="text-right">
          {{ period.month }}/{{ period.year.toString().slice(-2) }}
        </td>
      </tr>

      <tr v-for="group in getVisibleCategoriesGroupsInSummary()" :key="group.id">
        <td>{{ group.name }}</td>
        <td v-for="(period, index) in periods" :key="index" class="text-right">
          <a :href="`#${group.id}-${period.year}-${period.month}`">
            {{ getCategoryGroupTotalFormated(group, { year: period.year, month: period.month }) }}
          </a>
        </td>
      </tr>

      <tr>
        <td>Total</td>
        <td v-for="(period, index) in periods" :key="index" class="text-right">
          {{ getSummaryTotalFormated({ year: period.year, month: period.month }) }}
        </td>
      </tr>

      <tr>
        <td>Entradas</td>
        <td v-for="(period, index) in periods" :key="index" class="text-right">
          {{ getFormatedValue(getSummaryTotalByType(SummaryType.Inflow, { year: period.year, month: period.month })) }}
        </td>
      </tr>

      <tr>
        <td>Saídas</td>
        <td v-for="(period, index) in periods" :key="index" class="text-right">
          {{ getFormatedValue(getSummaryTotalByType(SummaryType.Outflow, { year: period.year, month: period.month })) }}
        </td>
      </tr>

      <template v-for="group in groups" :key="group.id">
        <tr>
          <td colspan="14" style="border: none;height: 45px;"></td>
        </tr>
        <tr>
          <td>{{ group.name }}</td>
          <td v-for="(period, index) in periods" :key="index" :id="`${group.id}-${period.year}-${period.month}`"
            class="text-right">
            {{ period.month }}/{{ period.year.toString().slice(-2) }}
          </td>
        </tr>
        <template v-for="category in group.inflowsCategories" :key="category.id">
          <tr>
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
                {{ getFormatedTotal({
                  year: period.year, month: period.month, categoryId: category.id
                }) }}
              </RouterLink>
            </td>
          </tr>
        </template>
        <template v-for="category in group.outflowsCategories" :key="category.id">
          <tr>
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
                {{ getFormatedTotal({
                  year: period.year, month: period.month, categoryId: category.id
                }) }}
              </RouterLink>
            </td>
          </tr>
        </template>
        <tr>
          <td>Total</td>
          <td v-for="(period, index) in periods" :key="index" class="text-right">
            {{ getCategoryGroupTotalFormated(group, { year: period.year, month: period.month }) }}
          </td>
        </tr>
      </template>
    </table>
  </main>
</template>