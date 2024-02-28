<template>
  <div>
    <Card :appearance="'gray'" :container="'xl'" :class="className['body']">
      <Group class="gap-y-8" >
        <Flex class="gap-4 w-full flex-wrap" :class="className['bt-control']">
          <Button
          :appearance="'blue'"
          :size="'sm'"
          class="h-10 text-base grow"
          @click="addSection"
          :text="commonButton.ADD_SECTION"/>

          <Button
          :appearance="'red'"
          :size="'sm'"
          class="h-10 text-base grow"
          :disabled="!characteristicSection"
          @click="() => setStatus('cancel-create')"
          :text="commonButton.DELETE_SECTION"/>
      </Flex>
      
      <form ref="form" class="w-full" v-if="characteristicSection">
        <Group class="gap-4 w-full">
          <FormField class="w-full"
          :value-missing="commonInput.ADD_SECTION.VALUE_MISSING">
            <Input
            :placeholder="commonInput.ADD_SECTION.PLACEHOLDER"
            v-model.trim="characteristicSection.title"
            required class="w-full"/>
          </FormField>
          
          <Flex v-for="(item, index) in characteristicSection.children"
          :key="index"
          class="gap-x-3 w-full">
            <FormField class="w-full"
            :value-missing="commonInput.ADD_NAME.VALUE_MISSING">
              <Input
              :placeholder="commonInput.ADD_NAME.PLACEHOLDER"
              autocapitalize="words"
              v-model="characteristicSection.children[index].name"
              required class="grow"/>
            </FormField>

            <FormField class="w-full"
            :value-missing="commonInput.ADD_VALUE.VALUE_MISSING">
              <Input 
              :placeholder="commonInput.ADD_VALUE.PLACEHOLDER"
              v-model="characteristicSection.children[index].value"
              required class="grow"/>
            </FormField>
            
            <Button tabindex="-1"
            @click="removeItem(index)"
            :appearance="'gray-icon'"
            :icon-left="{ 'key': 'close', size: '20_20' }"/>
          </Flex>
          
          <Flex class="gap-4 w-full flex-wrap" :class="className['bt-control']">
            <Button
            :appearance="'blue'"
            :size="'sm'"
            @click="addItem"
            :text="commonButton.ADD_FIELD"
            class="h-10 text-base grow"/>

            <Button
            :appearance="'yellow'"
            :size="'sm'"
            class="h-10 text-base grow"
            @click="() => editActive ? setStatus('apply-change') : createSection()"
            :text="editActive ? commonButton.APPLY_CHANGES : commonButton.CREATE_SECTION"/>
          </Flex>
        </Group>
      </form>
      <Group v-if="data.length" class="w-full gap-y-4">
        <Group v-for="item, index in data" :key="item.title" class="w-full">
          <Group class="gap-y-3 w-full">
            <Flex class="gap-x-8 w-full">
              <Title :tag="'h3'" :text="item.title" class="grow truncate"/>
              <Button :appearance="'gray-icon'"
              :icon-left="{ key: 'edit', size: '24_24' }"
              @click="makeEditingActive(index)"/>
              <Button :appearance="'gray-icon'"
              :icon-left="{ key: 'delete', size: '24_24' }"
              @click="initDeleteGroup(index)"/>
            </Flex>
            <div class="decor-line"></div>
            <Group class="w-full gap-2">
              <Flex v-for="el in item.children" :key="el.name" class="w-full gap-4">
                <p class="grow truncate">{{ el.name }}</p>
                <p class="truncate">{{ el.value }}</p>
              </Flex>
            </Group>
          </Group>
        </Group>
      </Group>  
    </Group>
  </Card>
  <Confirm
  :title="commonConfirm.DELETE_SECTION"
  :open="activeStatus === 'delete-section'"
  :resolve-fun="deleteGroup"
  @close-confirm="setStatus(null)"/>
  <Confirm
  :title="commonConfirm.CANCEL_CREATE_SECTION"
  :open="characteristicSection ? activeStatus === 'cancel-create' : false"
  :resolve-fun="deleteSection"
  @close-confirm="setStatus(null)"/>
  <Confirm
  :title="commonConfirm.APPLY_EDIT_SECTION"
  :open="activeStatus === 'apply-change'"
  :resolve-fun="applyEditGroup"
  :rejection-fun="resetCreateGroup"
  @close-confirm="setStatus(null)"/>
</div>
</template>

<script setup lang="ts" generic="T extends itemJSONData">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Title from "@/components/UI/Title/Title.vue";
import Input from "@/components/UI/Input/Input.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import Confirm from "@/components/Templates/modal/Confirm.vue";
import { alert as _alert } from "@/stores/alert";
import FormField from "@/components/UI/FormField/FormField.vue";
import { searchInvalidElem } from '@/utils/formHelpers'
import { BASE_BUTTON as commonButton, INPUT_CONTENT as commonInput, CONFIRM_TITLE as commonConfirm } from "@/common/C";
import { CharacteristicSection } from "@/type/intex";

export type itemJSONData = { char: { title: string, data: { name: string, value: string }[] }[] }

const props = defineProps<{ downloadJsonData: T | null }>()
const emit = defineEmits<{
    (e: 'characteristic', id: typeof data.value): void
}>()



const data = ref<CharacteristicSection[]>([])
const characteristicSection = ref<CharacteristicSection|null>(null)
const editActive = ref<boolean>(false)
const indexEditGroup = ref<number | null>(null)
const indexDeleteGroup = ref<number | null>(null)
const storeAlert = _alert()
const className = useCssModule()
const { activeStatus, setStatus } = useConfirm<'delete-section'|'apply-change'|'cancel-create'>()
const form = ref<HTMLFormElement | null>(null)


onMounted(() => {
  setStatus(null)
  onRestore()
  window.addEventListener('restore', onRestore)
})

onBeforeUnmount(() => {
  window.removeEventListener('restore', onRestore)
})

// watch
watch(data, (newV) => {
  emit('characteristic', newV)
})


watch(() => props.downloadJsonData, (newV) => {
  if (newV) {
    parseJSONData(newV)
  }
})


function onRestore() {
  data.value = []
  resetCreateGroup()
}


function parseJSONData<T extends itemJSONData>(jsonData:T) {
  for (const item of jsonData.char) {
    const section: CharacteristicSection = {
      title: item.title,
      children: item.data
    }
    if (section.title && section.children.length) {
      data.value.push(section)
    }
  }
}


function formCheck() {
  if (form.value instanceof HTMLFormElement && searchInvalidElem(form)) {
    if (characteristicSection.value?.children.length! > 0) {
      return true
    } else {
      storeAlert.create({ key: 'CREATE_EMPTY_CHARACTERISTIC' , state: 'error' })
    }
  }
  return false
}

function resetCreateGroup() {
  characteristicSection.value = null
  editActive.value = false
  indexEditGroup.value = null
}

function addSection(): void {
  characteristicSection.value = { title: '', children: [] }
}

function createSection() {
  if (formCheck()) {
    data.value.push(characteristicSection.value!)
    resetCreateGroup()
  }
}

function deleteSection(): void {
  resetCreateGroup()
}

function initDeleteGroup(indexGroup:number) {
  indexDeleteGroup.value = indexGroup
  setStatus('delete-section')
}

function deleteGroup() {
  if (data.value.length && !editActive.value) {
    data.value = data.value.filter((_,i) => indexDeleteGroup.value !== i)
    indexDeleteGroup.value = null
  }
}


function makeEditingActive(groupIndex:number) {
  if (data.value.length && data.value[groupIndex]) {
    indexEditGroup.value = groupIndex
    characteristicSection.value = JSON.parse(JSON.stringify(data.value[groupIndex]))
    editActive.value = true
  }
}

function applyEditGroup() {
  if (data.value.length && indexEditGroup.value !== null && formCheck()) {
    const indexActive = indexEditGroup.value
    const replaceItem = characteristicSection.value
    data.value = data.value.map((_, i) => i === indexActive ? replaceItem : _)
    resetCreateGroup()
  } 
}



function addItem(): void {
  if (characteristicSection.value) {
    characteristicSection.value.children.push({ name: '', value: ''})
  }
}
function removeItem(elemIndex: number) {
  if (characteristicSection.value) {
    characteristicSection.value = {
      ...characteristicSection.value,
      children: characteristicSection.value.children.filter((_,i) => i !== elemIndex)
    }
  }
}

</script>

<style lang="css" module>

.body {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .body {
    max-width: 720px;
  }
  .bt-control {
    width: 500px;
  }
}
</style>