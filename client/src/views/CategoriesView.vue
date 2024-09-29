<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const { categories, saveCategories } = useCategoryStore()

const editingCategories = ref(categories)

function deleteCategory(id: string) {
  if (confirm('Are you sure you want to delete this category?')) {
    editingCategories.value = editingCategories.value.filter((category) => category.id !== id)
  }
}

function addCategory() {
  editingCategories.value.push({
    id: Math.random().toString(36).substring(7),
    name: ''
  })
}

function handleSaveCategories() {
  saveCategories(editingCategories.value)
  router.go(-1)
}
</script>

<template>
  <h2>Categories</h2>

  <form @submit.prevent="handleSaveCategories">
    <table>
      <thead>
        <tr>
          <th style="width: 60px">ID</th>
          <th>Name</th>
          <th style="width: 90px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in editingCategories" :key="category.id">
          <td>{{ index + 1 }}</td>
          <td>
            <input type="text" v-model="category.name" />
          </td>
          <td>
            <button @click="deleteCategory(category.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <button type="button" @click="addCategory">Add Category</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>
