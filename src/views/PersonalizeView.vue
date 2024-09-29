<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore';
import { usePersonalizeStore } from '@/stores/PersonalizeStore';
import type { SummaryGroup } from '@/types/Summary';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const { categories } = useCategoryStore();
const { groups, saveGroups } = usePersonalizeStore();

const editingGroup = ref<SummaryGroup[]>(groups);

function handleRemoveGroup(groupId: string) {
    confirm('Are you sure you want to remove this group?') &&
        editingGroup.value.splice(editingGroup.value.findIndex((group) => group.id === groupId), 1);
}

function handleAddGroup() {
    editingGroup.value.push({
        id: Math.random().toString(36).substring(7),
        name: '',
        items: [
            {
                categoryId: '',
                name: '',
                operation: 'sum',
            },
        ],
    });
}

function handleSave() {
    editingGroup.value.forEach((group) => {
        group.items.forEach((item) => {
            const category = categories.find((category) => category.id === item.categoryId);
            item.name = category?.name || '';
        });
    });

    saveGroups(editingGroup.value);
    router.push('/');
}

if (groups.length === 0) {
    handleAddGroup();
}

</script>
<template>
    <div>
        <h1>Personalize</h1>
        <p>Personalize your experience</p>

        <div class="card" v-for="group in groups" :key="group.id">
            <div>
                <label>Nome</label>
                <input type="text" v-model="group.name" />
            </div>
            <h2>Items</h2>
            <table>
                <thead>
                    <tr>
                        <th style="width: 60px;">#</th>
                        <th style="width: 270px;">Operation</th>
                        <th>Category</th>
                        <th style="width: 90px;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in group.items" :key="item.categoryId">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <select v-model="item.operation">
                                <option value="sum">Somar</option>
                                <option value="subtract">Subtrair</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="item.categoryId">
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <button @click="group.items.splice(index, 1)">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="card__footer">
                <button @click="group.items.push({ categoryId: '', name: '', operation: 'sum' })">Add Item</button>
                <button @click="handleRemoveGroup(group.id)">Remove Group</button>
            </div>
        </div>
        <div class="buttons">
            <button @click="handleAddGroup">Add Group</button>
            <button @click="handleSave">Save</button>
        </div>
    </div>
</template>

<style>
.card {
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px 0;
    border-radius: 8px;
}

.card__footer {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}

.card__footer button {
    margin-right: 10px;
}
</style>