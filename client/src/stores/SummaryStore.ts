import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Summary, SummaryFilter, SummaryPeriod } from '@/types/Summary'
import Api from '@/api'

const LOCALSTORAGE_NAME = 'summary'

export const useSummaryStore = defineStore('summaries', () => {
  const summaries = ref<Summary[]>([])

  async function fetchData() {
    summaries.value = await Api.summaries.load()
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(summaries.value))
  }

  function getTotal({ year, month, categoryId }: SummaryFilter): number {
    let total = 0

    for (const summary of summaries.value) {
      if (
        (!year || summary.year === year) &&
        (!month || summary.month === month) &&
        (!categoryId || summary.category.id === categoryId)
      ) {
        total += summary.totalAmount
      }
    }

    return total
  }

  function listPeriods(): SummaryPeriod[] {
    const periods: SummaryPeriod[] = []

    const today = new Date()
    const initialPeriod = new Date(today.getFullYear(), today.getMonth() - 2)
    const endPeriod = new Date(today.getFullYear(), today.getMonth() + 9)

    for (let date = initialPeriod; date <= endPeriod; date.setMonth(date.getMonth() + 1)) {
      periods.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1
      })
    }

    return periods
  }

  fetchData()

  return { summaries, listPeriods, getTotal }
})
