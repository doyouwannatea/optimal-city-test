<template>
  <VList>
    <VListItem
      v-for="nameValueItem in props.list"
      :key="nameValueItem.name"
      :title="nameValueItem.name"
      :subtitle="nameValueItem.value"
      @click="emit('select-element', nameValueItem)"
    >
      <template #prepend>
        <div class="mr-3">{ }</div>
      </template>
    </VListItem>
  </VList>
</template>

<script setup lang="ts">
import type { NameValue } from '@/models/NameValue'

type Props = { list: Readonly<NameValue[]> }
type Emits = { (e: 'select-element', element: NameValue): void }

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
