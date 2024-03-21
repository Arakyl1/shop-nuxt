<template>
  <Card :appearance="'gray'" :container="'xl'">
    <Grid :container="'xs'" class="gap-8">
      <Group :tag="'fieldset'" class="grow gap-6">
        <Title :tag="'h3'" :text="common.TITLE_DESCRIPTION"/>
        <div class="decor-line"></div>
        <textarea
        :name="modelProp('ProductCard', 'description')"
        autocapitalize="words" ref="textarea"
        class="bg-white p-6 w-full"
        :class="className['textarea']"
        :placeholder="commonInput.PRODUCT_CREATE_DESCRIPTION_TEXTAREA.PLACEHOLDER"></textarea>
      </Group>
      <Group :tag="'fieldset'" class="grow gap-6">
        <Title :tag="'h3'" :text="common.TITLE_ADDITIONAL_OPTION"/>
        <div class="decor-line"></div>
        <Flex  v-if="otherData" class="gap-6 flex-wrap">
          <Checkbox v-for="item in otherData" :key="item.value"
          :attr="{
            id: item.name,
            name: item.name,
            value: true,
          }"
          :checked="randomNum ? checkRandomNum() : checkRandomNum()"
          :text="item.value"
          class="h-5"/>
        </Flex>
      </Group>
    </Grid>
  </Card>
</template>
<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Grid from "@/components/UI/Grid/Grid.vue";
import Title from "@/components/UI/Title/Title.vue";
import Card from "@/components/UI/Card/Card.vue";
import Checkbox from "@/components/UI/Checkbox/Checkbox.vue";
import { INPUT_CONTENT as commonInput, PAGE_ADD as common } from "@/common/C";

const randomNum = ref(1)
const className = useCssModule()
const otherData = ref()

await useFetch('/api/attridute/get', {
    server: false,
    method: 'GET',
    params: { type: 'OTHER' },
    key: 'attridute:OTHER',
    onResponse({ response }) {
        if (response.status < 400) {
            otherData.value = response._data.filter((_: { type: string; }) => _.type === 'OTHER')
        }
    }
})


onMounted(() => {
  window.addEventListener('restore', onRestore)
})

onBeforeUnmount(() => {
  window.removeEventListener('restore', onRestore)
})

function onRestore() {
  nextTick(() => { randomNum.value = ++randomNum.value })
}

function checkRandomNum() {
  return Math.random() > 0.35
}
// style
</script>


<style lang="css" module>
/* purgecss ignore */
.textarea {
  height: 20rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--rounded-xl);
  resize: vertical;
  font-size: var(--text-md);
}
.textarea:focus-visible {
  outline: none;
}
</style>