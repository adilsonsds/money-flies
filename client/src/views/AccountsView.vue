<script setup lang="ts">
import { useAccountStore } from '@/stores/AccountStore';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { accounts, createAccount } = useAccountStore()

const editingAccounts = ref(accounts)

async function confirmAndDelete(id: number) {
  // if (confirm('Are you sure you want to delete this category?')) {
  //   if (id > 0) await deleteCategory(id)
  //   editingAccounts.value = editingAccounts.value.filter((item) => item.id !== id)
  // }
  if (id <= 0) {
    editingAccounts.value = editingAccounts.value.filter((item) => item.id !== id)
    return
  }
}

function add() {
  editingAccounts.value.push({
    id: 0,
    name: ''
  })
}

async function handleSave() {
  var promises = Array<Promise<any>>()

  editingAccounts.value.forEach((item) => {
    if (item.id === 0) {
      promises.push(createAccount({ name: item.name }))
    }
  })

  await Promise.all(promises)

  router.go(-1)
}
</script>

<template>
  <h2>Contas</h2>
  <form @submit.prevent="handleSave">
    <table>
      <thead>
        <tr>
          <th style="width: 60px">ID</th>
          <th>Name</th>
          <th style="width: 90px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in editingAccounts" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="item.id > 0">{{ item.name }}</span>
            <input v-else type="text" v-model="item.name" />
          </td>
          <td>
            <button v-if="item.id == 0" @click="confirmAndDelete(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <button type="button" @click="add">Add</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>
