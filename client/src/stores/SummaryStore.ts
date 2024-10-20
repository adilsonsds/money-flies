import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PayerSummary, SummaryFilter } from '@/types/Summary'
import Api from '@/api'

const LOCALSTORAGE_NAME = 'summary'

export const useSummaryStore = defineStore('summaries', () => {
  const payerSummaries = ref<PayerSummary[]>([])

  async function fetchData() {
    payerSummaries.value = await Api.summaries.load()
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(payerSummaries.value))
  }

  function getTotal({ year, month, categoryId, payerId }: SummaryFilter): number {
    let total = 0

    for (const payerSummary of payerSummaries.value) {
      if (!payerId || payerSummary.id === payerId) {
        for (const summary of payerSummary.summaries) {
          if (
            (!year || summary.year === year) &&
            (!month || summary.month === month) &&
            (!categoryId || summary.category.id === categoryId)
          ) {
            total += summary.total
          }
        }
      }
    }

    return total
  }

  fetchData()

  return { payerSummaries, getTotal }
})
