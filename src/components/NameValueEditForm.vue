<template>
  <form @submit.prevent="onEditElement(newItemValue)">
    <label>
      {{ nameValueStore.currentEditableElement?.name }}
      <VTextField
        ref="inputRef"
        type="text"
        placeholder="Введите новое значение для элемента"
        v-model="newItemValue"
      />
    </label>
    <VBtn type="submit">Сохранить</VBtn>
  </form>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { NameValue } from '@/models/NameValue'
import { useNameValueStore } from '@/stores/nameValueStore'

const nameValueStore = useNameValueStore()
const newItemValue = ref('')
const inputRef = ref<HTMLInputElement>()

type Props = { nameValueItem: NameValue; value: string }
type Emits = { (e: 'update:value', value: string): void }

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

watch(
  () => props.nameValueItem,
  async (item) => {
    newItemValue.value = item?.value || ''
    await nextTick()
    inputRef.value?.focus()
  },
  { immediate: true }
)

function onEditElement(elementValue: string) {
  emit('update:value', elementValue)
}
</script>
