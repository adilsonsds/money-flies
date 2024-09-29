import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types/Category'

const LOCALSTORAGE_NAME = 'categories'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  function saveCategories(editingCategories: Category[]) {
    categories.value = editingCategories
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(categories.value))
  }

  return { categories, saveCategories }
})
