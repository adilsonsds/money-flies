<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useActivityStore } from '@/stores/ActivityStore';
import type { SummaryFilter } from '@/types/Summary';

const route = useRoute();
const router = useRouter();

const { getTransactions } = useActivityStore();

const getFilter = (): SummaryFilter => {
    const filter: SummaryFilter = {
        period: undefined,
        categoryId: route.query.category ? String(route.query.category) : undefined
    };

    if (route.query.start && route.query.end) {
        const startDate = (route.query.start as string).split('-');
        const endDate = (route.query.end as string).split('-');

        if (startDate.length === 3 || endDate.length === 3) {
            filter.period = {
                start: new Date(Number(startDate[0]), Number(startDate[1]) - 1, Number(startDate[2])),
                end: new Date(Number(endDate[0]), Number(endDate[1]) - 1, Number(endDate[2]))
            };
        }
    }

    return filter;
};

const transactions = getTransactions(getFilter());
</script>
<template>
    <h1>TransactionsView</h1>
    <button @click="router.go(-1)" style="margin: 10px 0 20px;">Voltar</button>
    <table>
        <thead>
            <tr>
                <th style="width: 120px;">Data</th>
                <th style="width: 300px;">Atividade</th>
                <th style="width: 180px;">Categoria</th>
                <th style="width: 120px;">Valor</th>
                <th style="width: 90px;">Pago?</th>
                <th>Descrição</th>
                <th style="width: 30px;"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
                <td>{{ transaction.date }}</td>
                <td>{{ transaction.activity.title }}</td>
                <td>{{ transaction.category.name }}</td>
                <td class="text-right">
                    {{
                        transaction.amount.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })
                    }}
                </td>
                <td>{{ transaction.paid ? 'Sim' : 'Não' }}</td>
                <td>{{ transaction.description }}</td>
                <td>
                    <RouterLink :to="{ name: 'activities-edit', params: { id: transaction.activity.id } }">
                        Editar
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>