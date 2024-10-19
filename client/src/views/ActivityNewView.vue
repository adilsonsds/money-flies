<script setup lang="ts">
import Api from '@/api';
import { useCategoryStore } from '@/stores/CategoryStore'
import { usePayerStore } from '@/stores/PayerStore';
import type { TransactionCreated } from '@/types/Activity'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { categories } = useCategoryStore()
const { payers } = usePayerStore()

const title = ref('')
const activityDate = ref(new Date().toLocaleDateString('en-CA'))
const transactions = ref<TransactionCreated[]>([])

function addTransaction() {
  if (transactions.value.length === 0) {
    transactions.value.push({
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
  const clonedTransaction = { ...lastTransaction }
  transactions.value.push(clonedTransaction)
}

addTransaction()

async function removeTransaction(index: number) {
  const confirmed = confirm('Are you sure you want to remove this transaction?')
  if (confirmed) {
    transactions.value.splice(index, 1)
  }
}

async function handleSubmit() {

  const activityId = await Api.activities.create({
    title: title.value,
    date: activityDate.value
  })

  let success = activityId !== null && activityId > 0

  if (success) {
    const promises = []

    for (const transaction of transactions.value) {
      promises.push(
        Api.activities.addTransaction(activityId!, transaction)
      )
    }

    const transactionIds = await Promise.all(promises)
    success = transactionIds.every((id) => id !== null)
  }

  if (success) {
    router.go(-1)
  }
}

</script>

<template>
  <main>
    <h1>New Activity</h1>
    <form @submit.prevent="handleSubmit">
      <div class="">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" />
      </div>

      <div>
        <label for="activity-date">Date</label>
        <input type="date" id="activity-date" v-model="activityDate" />
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
