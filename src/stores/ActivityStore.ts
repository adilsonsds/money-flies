import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Activity, Transaction } from '@/types/Activity'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref<Activity[]>([
    {
      id: '1',
      title: 'Groceries',
      transactions: [
        {
          id: '1',
          category: '1',
          date: '2024-12-01',
          amount: 100,
          paid: true,
          description: 'Bought some food'
        },
        {
          id: '2',
          category: '2',
          date: '2024-09-02',
          amount: 50,
          paid: true,
          description: 'Bought some more food'
        }
      ]
    }
  ])

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
  }

  return { getById, getTotal, saveActivity }
})
