<script setup lang="ts">
import Api from '@/api';
import type { SummaryFilter } from '@/types/Summary';
import type { Transaction } from '@/types/Transaction';
import { ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter()

const resultItens = ref<Transaction[]>([]);
const filterText = ref('');

async function loadTransactions() {
    const filter: SummaryFilter = {
        year: route.query.year ? Number(route.query.year) : undefined,
        month: route.query.month ? Number(route.query.month) : undefined,
        categoryId: route.query.categoryId ? Number(route.query.categoryId) : undefined,
        accountId: route.query.accountId ? Number(route.query.accountId) : undefined,
        contentText: filterText.value
    }

    console.log(route.query);
    console.log(router.currentRoute.value.query);
    resultItens.value = await Api.transactions.list(1, 100, filter);
}

function applyFilter() {
    loadTransactions();
}

onBeforeRouteUpdate((to, from) => {
    if (from.name === 'transactions-create' || from.name === 'transactions-edit') {
        loadTransactions();
    }
});

loadTransactions();

</script>
<template>
    <h1>TransactionsView</h1>
    <button @click="router.go(-1)" style="margin: 10px 0 20px">Voltar</button>
    <RouterLink to="/transactions/new">Nova Transação</RouterLink>

    <form @submit.prevent="applyFilter" style="margin: 20px 0">
        <input type="text" v-model="filterText" placeholder="Filter transactions" />
        <button type="submit">Filter</button>
    </form>

    <table>
        <thead>
            <tr>
                <th style="width: 120px">Data</th>
                <th style="width: 180px">Categoria</th>
                <th style="width: 120px">Valor</th>
                <th style="width: 90px">Pago?</th>
                <th>Descrição</th>
                <th style="width: 120px">Pagador</th>
                <th style="width: 120px">Recebedor</th>
                <th style="width: 120px"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="result in resultItens" :key="result.id">
                <td>{{ result.date }}</td>
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
                <td>{{ result.accountFrom.name }}</td>
                <td>{{ result.accountTo.name }}</td>
                <td>
                    <RouterLink :to="{ name: 'transactions-edit', params: { id: result.id } }">Editar</RouterLink>
                    <RouterLink :to="{ name: 'transactions-create', query: { cloneId: result.id } }"
                        style="margin-left: 6px;">
                        Copiar
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
    <RouterView />
</template>