import { computed, reactive, readonly, toRefs } from 'vue'
import { defineStore } from 'pinia'
import type { NameValue } from '@/models/NameValue'

const nameValueList: NameValue[] = [
  { name: 'Name1', value: 'Value1' },
  { name: 'Name2', value: 'Value2' },
  { name: 'Name3', value: 'Value3' },
  { name: 'Name4', value: 'Value4' },
  { name: 'Name5', value: 'Value5' },
  { name: 'Name6', value: 'Value6' },
  { name: 'Name7', value: 'Value7' },
  { name: 'Name8', value: 'Value8' },
  { name: 'Name9', value: 'Value9' },
  { name: 'Name10', value: 'Value10' },
  { name: 'Name11', value: 'Value11' },
  { name: 'Name12', value: 'Value12' },
  { name: 'Name13', value: 'Value13' },
  { name: 'Name14', value: 'Value14' },
  { name: 'Name15', value: 'Value15' },
  { name: 'Name16', value: 'Value16' },
  { name: 'Name17', value: 'Value17' },
  { name: 'Name18', value: 'Value18' },
  { name: 'Name19', value: 'Value19' },
  { name: 'Name20', value: 'Value20' },
  { name: 'Name21', value: 'Value21' },
  { name: 'Name22', value: 'Value22' },
  { name: 'Name23', value: 'Value23' },
  { name: 'Name24', value: 'Value24' },
  { name: 'Name25', value: 'Value25' },
  { name: 'Name26', value: 'Value26' },
  { name: 'Name27', value: 'Value27' },
  { name: 'Name28', value: 'Value28' },
  { name: 'Name29', value: 'Value29' },
  { name: 'Name30', value: 'Value30' }
]

interface State {
  nameValueList: NameValue[]
  editableElementName?: string
}

export const useNameValueStore = defineStore('name-value', () => {
  const state = reactive<State>({
    nameValueList: nameValueList,
    editableElementName: undefined
  })

  const currentEditableElementIndex = computed<number>(() =>
    state.nameValueList.findIndex((element) => element.name === state.editableElementName)
  )

  const currentEditableElement = computed<NameValue | undefined>(
    () => state.nameValueList[currentEditableElementIndex.value]
  )

  function editElement(value: string) {
    if (!state.nameValueList) {
      console.error('element list not initialized')
      return
    }
    if (currentEditableElementIndex.value === -1) {
      console.error('element not found')
      return
    }
    state.nameValueList[currentEditableElementIndex.value].value = value
  }

  function setEditableElement(elementName: string) {
    state.editableElementName = elementName
  }

  return {
    ...toRefs(readonly(state)),
    editElement,
    setEditableElement,
    currentEditableElementIndex,
    currentEditableElement
  }
})
