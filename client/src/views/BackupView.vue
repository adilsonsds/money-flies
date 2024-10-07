<script setup lang="ts">
// import { useRouter } from 'vue-router'
// import { useActivityStore } from '@/stores/ActivityStore'
// import type { Activity, TransactionItemResult } from '@/types/Activity'
// import type { Category } from '@/types/Category'

// const { getTransactions } = useActivityStore()

// function exportToJson() {
//   const data = getTransactions({})
//   const json = JSON.stringify(data, null, 2)
//   const blob = new Blob([json], { type: 'application/json' })
//   const url = URL.createObjectURL(blob)
//   const a = document.createElement('a')
//   a.href = url
//   a.download = 'backup.json'
//   a.click()
//   URL.revokeObjectURL(url)
//   a.remove()
// }

// function importFromJson() {
//   const input = document.createElement('input')
//   input.type = 'file'
//   input.accept = 'application/json'
//   input.onchange = async (event: Event) => {
//     if (!event.target) return
//     const file = (event.target as HTMLInputElement).files?.[0]
//     if (!file) return
//     const json = await file.text()
//     const transactions = JSON.parse(json) as TransactionItemResult[]

//     const activities = Array<Activity>()
//     const categories = Array<Category>()

//     transactions.forEach((transaction) => {
//       let activity = activities.find((activity) => activity.id === transaction.activity.id)
//       if (!activity) {
//         activity = {
//           id: transaction.activity.id,
//           title: transaction.activity.title,
//           transactions: []
//         }
//         activities.push(activity)
//       }

//       let transactionItem = {
//         id: transaction.id,
//         date: transaction.date,
//         amount: transaction.amount,
//         category: transaction.category,
//         paid: transaction.paid,
//         description: transaction.description
//       }

//       let exitsCategory = categories.find((category) => category.id.toString() === transaction.category.id)
//       if (!exitsCategory) {
//         categories.push({
//           id: parseInt(transaction.category.id),
//           name: transaction.category.name
//         })
//       }

//       activity.transactions.push(transactionItem)
//     })

//     localStorage.setItem('activities', JSON.stringify(activities))
//     localStorage.setItem('categories', JSON.stringify(categories))

//     router.push('/')
//   }
//   input.click()
//   input.remove()
// }

// function clearLocalStorage() {
//   confirm('Are you sure you want to clear all data?') && localStorage.clear()
// }

// const router = useRouter()
// function backToHome() {
//   router.push('/')
// }
</script>
<template>
  <h1>Backup</h1>
  <!-- <button type="button" @click="backToHome" style="margin-right: 10px">Back to Home</button>
  <button type="button" @click="exportToJson" style="margin-right: 10px">Export to JSON</button>
  <button type="button" @click="importFromJson" style="margin-right: 10px">Import from JSON</button>
  <button type="button" @click="clearLocalStorage">Clear Local Storage</button> -->
</template>
