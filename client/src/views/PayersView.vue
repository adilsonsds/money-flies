<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePayerStore } from '@/stores/PayerStore';

const router = useRouter()

const { payers, createPayer } = usePayerStore()

const editingList = ref(payers)

function handleAdd() {
  editingList.value.push({
    id: 0,
    name: ''
  })
}

async function handleSave() {
  var promises = Array<Promise<any>>()

  editingList.value.forEach((payer) => {
    if (payer.id === 0) {
      promises.push(createPayer(payer.name))
    }
  })

  if (promises.length === 0) {
    await Promise.all(promises)
  }

  router.go(-1)
}
</script>

<template>
  <h2>Payers</h2>

  <form @submit.prevent="handleSave">
    <table>
      <thead>
        <tr>
          <th style="width: 60px">ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in editingList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="item.id > 0">{{ item.name }}</span>
            <input v-else type="text" v-model="item.name" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons">
      <button type="button" @click="handleAdd">Add</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>
