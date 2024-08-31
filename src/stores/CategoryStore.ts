import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types/Category'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<Category[]>([
        { id: '1', name: 'Salary' },
        { id: '2', name: 'Category 2' },
        { id: '3', name: 'Category 3' },
    ])

    function addCategory(category: Category) {
        categories.value.push(category)
    }

    return { categories, addCategory }
})
