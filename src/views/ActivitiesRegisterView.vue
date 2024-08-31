<script setup lang="ts">
import { useActivityStore } from '@/stores/ActivityStore'
import { useCategoryStore } from '@/stores/CategoryStore'
import type { Transaction } from '@/types/Activity'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { getById, saveActivity } = useActivityStore()
const { categories } = useCategoryStore()

const id = ref('')
const title = ref('')
const transactions = ref<Transaction[]>([])

function addTransaction() {
  if (transactions.value.length === 0) {
    transactions.value.push({
      id: Math.random().toString(36).substring(7),
      category: categories[0],
      date: new Date().toLocaleDateString('en-CA'),
      amount: 0,
      paid: false,
      description: ''
    })
    return
  }

  const lastTransaction = transactions.value[transactions.value.length - 1]
  const clonedTransaction = { ...lastTransaction }
  transactions.value.push(clonedTransaction)
}

function removeTransaction(index: number) {
  transactions.value.splice(index, 1)
}

function handleSubmit() {
  saveActivity(title.value, transactions.value, id.value)
  router.go(-1)
}

function loadActivity() {
  const activityId = route.params.id
  if (!activityId || typeof activityId !== 'string') {
    addTransaction()
    return
  }

  const activity = getById(activityId)
  if (!activity) {
    addTransaction()
    return
  }

  id.value = activity.id
  title.value = activity.title
  transactions.value = activity.transactions
}

loadActivity()
</script>

<template>
  <main>
    <h1>New Activity</h1>
    <form @submit.prevent="handleSubmit">
      <div class="">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" />
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
            <th style="width: 120px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="transaction.id">
            <td>{{ index + 1 }}</td>
            <td>
              <select v-model="transaction.category">
                <option v-for="category in categories" :key="category.id" :value="category">
                  {{ category.name }}
                </option>
              </select>
            </td>
            <td><input type="date" v-model="transaction.date" /></td>
            <td><input type="number" v-model="transaction.amount" /></td>
            <td><input type="checkbox" v-model="transaction.paid" /></td>
            <td><input type="text" v-model="transaction.description" /></td>
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
