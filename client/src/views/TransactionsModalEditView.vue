<script lang="ts" setup>
import Api from '@/api';
import { useAccountStore } from '@/stores/AccountStore'
import { useCategoryStore } from '@/stores/CategoryStore'
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { categories } = useCategoryStore()
const { accounts } = useAccountStore()
const id = ref(0)
const date = ref<string>(new Date().toLocaleDateString('en-CA'))
const amount = ref(0)
const categoryId = ref<number | null>(null)
const paid = ref<boolean | string>(false)
const description = ref('')
const accountFromId = ref<number | null>(1)
const accountToId = ref<number | null>(2)

function closeModal() {
    router.go(-1)
}

async function handleSubmit() {
    await Api.transactions.update(id.value, {
        categoryId: categoryId.value!,
        date: date.value,
        amount: amount.value,
        paid: paid.value == 'true' || paid.value == true,
        description: description.value,
        accountIdFrom: accountFromId.value!,
        accountIdTo: accountToId.value!
    })

    closeModal()
}

async function handleDelete() {
    await Api.transactions.delete(id.value)
    closeModal()
}

function incrementMonth(date: string): string {
    const parts = date.split('-');
    const dateObject = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    dateObject.setMonth(dateObject.getMonth() + 1);
    return dateObject.toLocaleDateString('en-CA');
}

function changeAccounts() {
    const temp = accountFromId.value
    accountFromId.value = accountToId.value
    accountToId.value = temp
}

async function loadTransaction() {
    const transactionId = route.params.id as string;
    const transaction = await Api.transactions.loadById(transactionId)

    if (!transaction) {
        return
    }

    id.value = transaction.id
    date.value = transaction.date
    amount.value = transaction.amount
    categoryId.value = transaction.category.id
    paid.value = transaction.paid
    description.value = transaction.description
    accountFromId.value = transaction.accountFrom.id
    accountToId.value = transaction.accountTo.id
}

if (route.params.id) {
    loadTransaction()
}

</script>
<template>
    <div class="overlay">
        <div class="modal">
            <h2>Registrar transação</h2>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="date">Data:</label>
                    <input id="date" type="date" v-model="date" />
                    <button type="button" @click="date = incrementMonth(date)" class="link">Próximo mês</button>
                </div>
                <div class="form-group">
                    <label for="amount">Valor:</label>
                    <input id="amount" type="number" step="0.01" v-model="amount" />
                </div>
                <div class="form-group">
                    <label for="category">Categoria</label>
                    <select id="category" v-model="categoryId">
                        <option value="">Selecione uma categoria</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="paid">Pago?</label>
                    <div style="display: flex; align-items: left;">
                        <input id="paid-yes" type="radio" value="true" v-model="paid" />
                        <label for="paid-yes" style="margin-right: 10px;">Sim</label>
                        <input id="paid-no" type="radio" value="false" v-model="paid" />
                        <label for="paid-no">Não</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="description">Descrição</label>
                    <input id="description" type="text" v-model="description" />
                </div>
                <div style="display: flex; justify-content: space-between;align-items: last baseline;">
                    <div class="form-group">
                        <label for="accountFrom">Pagador</label>
                        <select id="accountFrom" v-model="accountFromId">
                            <option value="">Selecione uma conta</option>
                            <option v-for="account in accounts" :key="account.id" :value="account.id">
                                {{ account.name }}
                            </option>
                        </select>
                    </div>
                    <button type="button" @click="changeAccounts" style="margin: 0 10px;">Inverter</button>
                    <div class="form-group">
                        <label for="accountTo">Recebedor</label>
                        <select id="accountTo" v-model="accountToId">
                            <option value="">Selecione uma conta</option>
                            <option v-for="account in accounts" :key="account.id" :value="account.id">
                                {{ account.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group" style="display: flex; justify-content: space-between;">
                    <button type="button" @click="closeModal">Cancelar e sair</button>
                    <button type="button" @click="handleDelete">Excluir</button>
                    <button type="submit">Salvar</button>
                </div>
            </form>

        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 10px;
}

.link {
    background: none;
    border: none;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
}
</style>