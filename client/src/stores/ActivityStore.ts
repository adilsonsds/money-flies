import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Activity, Transaction, TransactionItemResult } from '@/types/Activity'
import type { SummaryFilter } from '@/types/Summary'

const LOCALSTORAGE_NAME = 'activities'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref<Activity[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  const getById = (id: string): Activity | undefined =>
    activities.value.find((activity) => activity.id === id)

  const getTransactions = (filter: SummaryFilter): TransactionItemResult[] => {
    const transactions: TransactionItemResult[] = []

    activities.value.forEach((activity) => {
      activity.transactions.forEach((transaction) => {
        const dateParts = transaction.date.split('-')
        const transactionDate = new Date(
          Number(dateParts[0]),
          Number(dateParts[1]) - 1,
          Number(dateParts[2])
        ).getTime()

        if (
          (!filter.period?.start || transactionDate >= filter.period.start.getTime()) &&
          (!filter.period?.end || transactionDate <= filter.period.end.getTime()) &&
          (!filter.categoryId || transaction.category.id === filter.categoryId)
        )
          transactions.push({
            ...transaction,
            activity: { id: activity.id, title: activity.title }
          })
      })
    })

    return transactions
  }

  const getTotal = (filter: SummaryFilter) =>
    getTransactions(filter).reduce((acc, transaction) => acc + transaction.amount, 0)

  const saveActivity = (title: string, transactions: Transaction[], id?: string | undefined) => {
    if (id) {
      const activity = getById(id)
      if (activity) {
        activity.title = title
        activity.transactions = transactions
      }
    } else {
      activities.value.push({ id: String(activities.value.length + 1), title, transactions })
    }

    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(activities.value))
  }

  return { getById, getTransactions, getTotal, saveActivity }
})
