<script setup lang="ts">
import Api from '@/api';
import { useCategoryStore } from '@/stores/CategoryStore'
import { usePayerStore } from '@/stores/PayerStore';
import type { TransactionEdited } from '@/types/Activity'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { categories } = useCategoryStore()
const { payers } = usePayerStore()

const id = ref(0)
const title = ref('')
const activityDate = ref(new Date().toLocaleDateString('en-CA'))
const transactions = ref<TransactionEdited[]>([])

const removedTransactions = ref<number[]>([])

function addTransaction() {
  if (transactions.value.length === 0) {
    transactions.value.push({
      id: 0,
      categoryId: categories[0].id,
      date: new Date().toLocaleDateString('en-CA'),
      amount: 0,
      paid: false,
      description: '',
      payerId: payers[0].id
    })
    return
  }

  const lastTransaction = transactions.value[transactions.value.length - 1]
  const clonedTransaction = { ...lastTransaction, id: 0 }
  transactions.value.push(clonedTransaction)
}

async function removeTransaction(index: number) {
  const confirmed = confirm('Are you sure you want to remove this transaction?')
  if (confirmed) {
    const transaction = transactions.value[index]
    transactions.value.splice(index, 1)
    removedTransactions.value.push(transaction.id)
  }
}

async function handleSubmit() {
  const promises = []

  for (const transaction of transactions.value) {
    if (transaction.id === 0) {
      promises.push(Api.activities.addTransaction(id.value, transaction))
    } else {
      promises.push(Api.activities.updateTransaction(id.value, transaction))
    }
  }

  for (const transactionId of removedTransactions.value) {
    promises.push(Api.activities.deleteTransaction(id.value, transactionId))
  }

  var results = await Promise.all(promises)
  const success = results.every((result) => result !== null)

  if (success) {
    router.go(-1)
  }
}

async function loadActivity() {
  const activityId = route.params.id
  if (!activityId || typeof activityId !== 'string') {
    router.push('home')
    return
  }

  const activity = await Api.activities.loadById(activityId)
  if (!activity) {
    router.push('home')
    return
  }

  id.value = activity.id
  title.value = activity.title
  activityDate.value = activity.date

  const transactionsResult = await Api.activities.listTransactions(activity.id)

  transactionsResult.forEach(transaction => {
    transactions.value.push({
      id: transaction.id,
      categoryId: transaction.category.id,
      date: transaction.date,
      amount: transaction.amount,
      paid: transaction.paid,
      description: transaction.description,
      payerId: transaction.payer.id
    })
  })
}

loadActivity()
</script>

<template>
  <main>
    <h1>New Activity</h1>
    <form @submit.prevent="handleSubmit">
      <div class="">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" readonly />
      </div>
      <div class="">
        <label for="activityDate">Date</label>
        <input type="date" id="activityDate" v-model="activityDate" readonly />
      </div>

      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 45px">#</th>
            <th style="width: 240px">Category</th>
            <th style="width: 180px">Date</th>
            <th style="width: 120px">Amount</th>
            <th style="width: 60px">Paid</th>
            <th>Description</th>
            <th style="width: 120px">Payer</th>
            <th style="width: 120px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <select v-model="transaction.categoryId">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </td>
            <td><input type="date" v-model="transaction.date" /></td>
            <td><input type="number" v-model="transaction.amount" step=".01" /></td>
            <td><input type="checkbox" v-model="transaction.paid" /></td>
            <td><input type="text" v-model="transaction.description" /></td>
            <td>
              <select v-model="transaction.payerId">
                <option v-for="payer in payers" :key="payer.id" :value="payer.id">
                  {{ payer.name }}
                </option>
              </select>
            </td>
            <td><button type="button" @click="removeTransaction(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>

      <div class="buttons">
        <button type="button" @click="addTransaction">Add Transaction</button>
        <button type="submit">Create</button>
      </div>
    </form>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}
</style>
