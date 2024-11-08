import { ref } from 'vue'
import { defineStore } from 'pinia'
import Api from '@/api'
import type { Account, RegisterAccount } from '@/types/Transaction'

const LOCALSTORAGE_NAME = 'accounts'

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  async function fetchData() {
    accounts.value = await Api.accounts.list()
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(accounts.value))
  }

  async function createAccount(account: RegisterAccount): Promise<void> {
    await Api.accounts.create(account)
    await fetchData()
  }

  fetchData()

  return { accounts, createAccount }
})
