import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Summary, SummaryFilter } from '@/types/Summary'

const LOCALSTORAGE_NAME = 'summary'

export const useSummaryStore = defineStore('summaries', () => {
  const summaries = ref<Summary[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5264/summaries')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: Summary[] = await response.json()
      summaries.value = data
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(summaries.value))
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  function getTotal({ year, month, categoryId }: SummaryFilter): number {
    return summaries.value
      .filter(
        (summary) =>
          (!year || summary.year === year) &&
          (!month || summary.month === month) &&
          (!categoryId || summary.category.id === categoryId)
      )
      .reduce((acc, summary) => acc + summary.total, 0)
  }

  async function getResult({ year, month, categoryId }: SummaryFilter) {
    try {
      const response = await fetch(
        categoryId && categoryId > 0
          ? `http://localhost:5264/summaries/${year}/${month}?categoryId=${categoryId}`
          : `http://localhost:5264/summaries/${year}/${month}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      console.log('response', response)
      return await response.json()
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
      return []
    }
  }

  fetchData()

  return { summaries, getTotal, getResult }
})
