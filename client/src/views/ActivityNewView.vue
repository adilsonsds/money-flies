<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import type { Activity, Transaction } from '@/types/Activity'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { categories } = useCategoryStore()

const id = ref(0)
const title = ref('')
const transactions = ref<Transaction[]>([])

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

async function createActivity(activity: Activity): Promise<number | null> {
  try {
    const response = await fetch('http://localhost:5264/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: activity.title,
        transactions: activity.transactions.map((transaction) => ({
          categoryId: transaction.category.id,
          date: transaction.date,
          amount: transaction.amount,
          paid: transaction.paid,
          description: transaction.description
        }))
      })
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const activityId = await response.json()
    return activityId
  } catch (error) {
    console.error('Failed to save activity:', error)
    return null;
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


async function handleSubmit() {
  const activity = {
    id: id.value,
    title: title.value,
    transactions: transactions.value
  }

  const activityId = await createActivity(activity)
  let success = activityId !== null && activityId > 0

  if (success) {
    const promises = []

    for (const transaction of transactions.value) {
      promises.push(createTransaction(activityId!, transaction))
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
