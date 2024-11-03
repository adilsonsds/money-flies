import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types/Transaction'

const LOCALSTORAGE_NAME = 'categories'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '[]'))

  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:5264/api/categories')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: Category[] = await response.json()
      categories.value = data
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(categories.value))
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  async function createCategory(name: string): Promise<number> {
    try {
      const response = await fetch('http://localhost:5264/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const categoryId: number = await response.json()

      categories.value.push({ id: categoryId, name })
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(categories.value))

      return categoryId
    } catch (error) {
      console.error('Failed to create category:', error)
      return -1
    }
  }

  async function deleteCategory(id: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5264/api/categories/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      categories.value = categories.value.filter((category) => category.id !== id)
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(categories.value))
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  fetchCategories()

  return { categories, createCategory, deleteCategory }
})
