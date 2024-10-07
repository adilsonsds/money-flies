<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import type { Activity, Transaction } from '@/types/Activity'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { categories } = useCategoryStore()

const id = ref(0)
const title = ref('')
const transactions = ref<Transaction[]>([])

const removedTransactions = ref<number[]>([])

function addTransaction() {
  if (transactions.value.length === 0) {
    transactions.value.push({
      id: 0,
      category: {
        id: categories[0].id,
        name: categories[0].name
      },
      date: new Date().toLocaleDateString('en-CA'),
      amount: 0,
      paid: false,
      description: ''
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

async function createTransaction(activityId: number, transaction: Transaction): Promise<number | null> {
  try {
    const response = await fetch(`http://localhost:5264/activities/${activityId}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryId: transaction.category.id,
        date: transaction.date,
        amount: transaction.amount,
        paid: transaction.paid,
        description: transaction.description
      })
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const transactionId = await response.json()
    return transactionId
  } catch (error) {
    console.error('Failed to save transaction:', error)
    return null;
  }
}

async function updateTransaction(activityId: number, transaction: Transaction): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:5264/activities/${activityId}/transactions/${transaction.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryId: transaction.category.id,
        date: transaction.date,
        amount: transaction.amount,
        paid: transaction.paid,
        description: transaction.description
      })
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return true
  } catch (error) {
    console.error('Failed to update transaction:', error)
    return false;
  }
}

async function deleteTransaction(activityId: number, transactionId: number): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:5264/activities/${activityId}/transactions/${transactionId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return true
  } catch (error) {
    console.error('Failed to delete transaction:', error)
    return false;
  }
}

async function handleSubmit() {
  const promises = []

  for (const transaction of transactions.value) {
    if (transaction.id === 0) {
      promises.push(createTransaction(id.value, transaction))
    } else {
      promises.push(updateTransaction(id.value, transaction))
    }
  }

  for (const transactionId of removedTransactions.value) {
    promises.push(deleteTransaction(id.value, transactionId))
  }

  var results = await Promise.all(promises)
  const success = results.every((result) => result !== null)

  if (success) {
    router.go(-1)
  }
}

async function getActivityById(id: number): Promise<Activity | null> {
  try {
    const response = await fetch(`http://localhost:5264/activities/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const activity: Activity = await response.json()
    return activity
  } catch (error) {
    console.error('Failed to get activity:', error)
    return null
  }
}

async function getTransactionsFromActivity(activityId: number): Promise<Transaction[] | null> {
  try {
    const response = await fetch(`http://localhost:5264/activities/${activityId}/transactions`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const transactions: Transaction[] = await response.json()
    return transactions
  } catch (error) {
    console.error('Failed to get transactions:', error)
    return null
  }
}

async function loadActivity() {
  const activityId = route.params.id
  if (!activityId || typeof activityId !== 'string') {
    router.push('home')
    return
  }

  const activity = await getActivityById(parseInt(activityId))
  if (!activity) {
    router.push('home')
    return
  }

  id.value = activity.id
  title.value = activity.title

  const transactionsResult = await getTransactionsFromActivity(activity.id)
  if (transactionsResult)
    transactions.value = transactionsResult
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
            <td><input type="number" v-model="transaction.amount" step=".01" /></td>
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
