<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const { categories, createCategory, deleteCategory } = useCategoryStore()

const editingCategories = ref(categories)

async function confirmAndDeleteCategory(id: number) {
  if (confirm('Are you sure you want to delete this category?')) {
    if (id > 0) await deleteCategory(id)
    editingCategories.value = editingCategories.value.filter((category) => category.id !== id)
  }
}

function addCategory() {
  editingCategories.value.push({
    id: 0,
    name: ''
  })
}

async function handleSaveCategories() {
  var promises = Array<Promise<any>>()

  editingCategories.value.forEach((category) => {
    if (category.id === 0) {
      promises.push(createCategory(category.name))
    }
  })

  await Promise.all(promises)

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
            <button @click="confirmAndDeleteCategory(category.id)">Delete</button>
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
