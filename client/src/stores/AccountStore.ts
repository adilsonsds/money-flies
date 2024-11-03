import { ref } from 'vue'
import { defineStore } from 'pinia'
import Api from '@/api'
import type { Account } from '@/types/Transaction'

const LOCALSTORAGE_NAME = 'accounts'

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  async function fetchData() {
    accounts.value = await Api.accounts.list()
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(accounts.value))
  }

  fetchData()

  return { accounts }
})
