<template>
  <main>
    <VContainer>
      <VRow>
        <VCol cols="3">
          <nav>
            <NameValueList :list="nameValueStore.nameValueList" @select-element="onSelectElement" />
          </nav>
        </VCol>
        <VCol>
          <section>
            <VAlert
              v-if="!nameValueStore.currentEditableElement"
              icon="mdi-information"
              text="Выберите элемент"
            />
            <NameValueEditForm
              v-else
              :name-value-item="nameValueStore.currentEditableElement"
              v-model:value="newItemValue"
              @update:value="onEditElement"
            />
          </section>
        </VCol>
      </VRow>
    </VContainer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NameValueEditForm from '@/components/NameValueEditForm.vue'
import NameValueList from '@/components/NameValueList.vue'
import type { NameValue } from '@/models/NameValue'
import { useNameValueStore } from '@/stores/nameValueStore'

const nameValueStore = useNameValueStore()
const newItemValue = ref('')

function onSelectElement(element: NameValue) {
  nameValueStore.setEditableElement(element.name)
}

function onEditElement(elementValue: string) {
  nameValueStore.editElement(elementValue)
}
</script>
