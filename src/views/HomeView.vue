<template>
  <main>
    <VContainer>
      <VRow>
        <VCol cols="3">
          <nav>
            <VList>
              <VListItem
                v-for="nameValueItem in nameValueStore.nameValueList"
                :key="nameValueItem.name"
                :title="nameValueItem.name"
                :subtitle="nameValueItem.value"
                @click="onSelectElement(nameValueItem)"
              >
                <template #prepend>
                  <div class="mr-3">{ }</div>
                </template>
              </VListItem>
            </VList>
          </nav>
        </VCol>
        <VCol>
          <section>
            <VAlert
              v-if="!nameValueStore.currentEditableElement"
              icon="mdi-information"
              text="Выберите элемент"
            />
            <form v-else @submit.prevent="nameValueStore.editElement(newItemValue)">
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
          </section>
        </VCol>
      </VRow>
    </VContainer>
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
