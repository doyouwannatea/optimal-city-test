<template>
  <main>
    <nav>
      <ul>
        <li v-for="nameValueItem in nameValueStore.nameValueList" :key="nameValueItem.name">
          <button @click="onSelectElement(nameValueItem)">
            {{ nameValueItem.name }} - {{ nameValueItem.value }}
          </button>
        </li>
      </ul>
    </nav>
    <section>
      <form @submit.prevent="nameValueStore.editElement(newItemValue)">
        <label>
          {{ nameValueStore.currentEditableElement?.name }}
          <input
            ref="inputRef"
            type="text"
            placeholder="Введите новое значение для элемента"
            v-model="newItemValue"
          />
        </label>
        <button>Сохранить</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { NameValue } from '@/models/NameValue'
import { useNameValueStore } from '@/stores/nameValueStore'
import { ref, watch } from 'vue'

const nameValueStore = useNameValueStore()
const newItemValue = ref('')
const inputRef = ref<HTMLInputElement>()

watch(
  () => nameValueStore.currentEditableElement,
  (currentEditableElement) => (newItemValue.value = currentEditableElement?.value || '')
)

function onSelectElement(element: NameValue) {
  nameValueStore.setEditableElement(element.name)
  inputRef.value?.focus()
}
</script>
