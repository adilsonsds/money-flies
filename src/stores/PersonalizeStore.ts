import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SummaryGroup } from '@/types/Summary'

const LOCALSTORAGE_NAME = 'personalize'

export const usePersonalizeStore = defineStore('personalize', () => {
  const groups = ref<SummaryGroup[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  const saveGroups = (editingGroups: SummaryGroup[]): void => {
    groups.value = editingGroups
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(groups.value))
  }

  return { groups, saveGroups }
})
