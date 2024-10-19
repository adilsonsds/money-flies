import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Payer } from '@/types/Payer'
import Api from '@/api'

const LOCALSTORAGE_NAME = 'payers'

export const usePayerStore = defineStore('payers', () => {
  const payers = ref<Payer[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  async function fetchData() {
    payers.value = await Api.payers.list()
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(payers.value))
  }

  async function createPayer(name: string) {
    const payerId = await Api.payers.create(name)
    await fetchData()
    return payerId
  }

  fetchData()

  return { payers, createPayer }
})
