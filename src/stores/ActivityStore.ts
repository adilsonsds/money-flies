import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Activity, Transaction } from '@/types/Activity'

const LOCALSTORAGE_NAME = 'activities'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref<Activity[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  const getById = (id: string): Activity | undefined =>
    activities.value.find((activity) => activity.id === id)

  const getTotal = (
    startDate?: Date | undefined,
    endDate?: Date | undefined,
    categoryId?: string | undefined
  ) => {
    let total = 0

    activities.value.forEach((activity) => {
      activity.transactions.forEach((transaction) => {
        const dateParts = transaction.date.split('-')
        const transactionDate = new Date(
          Number(dateParts[0]),
          Number(dateParts[1]) - 1,
          Number(dateParts[2])
        ).getTime()

        if (
          (!startDate || transactionDate >= startDate.getTime()) &&
          (!endDate || transactionDate <= endDate.getTime()) &&
          (!categoryId || transaction.category === categoryId)
        )
          total += transaction.amount
      })
    })

    return total
  }

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

  return { getById, getTotal, saveActivity }
})
