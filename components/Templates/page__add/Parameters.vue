<template>
  <section class="bg-gray-100 p-8 xl:p-6 lg:p-4">
    <div class="flex flex-wrap">
      <fieldset :class="style.item">
        <legend class="text-3xl xl:text-2xl lg:text-xl">Описание товара</legend>
        <div class="decor-line my-6 xl:my-4"></div>
        <textarea :name="modelProp('ProductCard', 'description')" autocapitalize="words" ref="textarea"
          class="bg-white p-6 w-full h-80 border border-gray-300 border-solid rounded focus-visible:outline-0"></textarea>
      </fieldset>
      <fieldset :class="style.item">
        <legend class="text-3xl xl:text-2xl lg:text-xl">Дополнительные опции</legend>
        <div class="decor-line my-6 xl:my-4"></div>
        <ul class="flex flex-wrap" v-if="otherParams">
          <li v-for="item in otherParams" :key="item.name" class="flex items-center mb-4">
            <AtomFormCheckbox :attr="{ id: item.name, name: item.name, value: true, checked: Math.random() >= 0.3 }" class="h-4"/>
            <label class="pr-3 pl-2 text-xl align-bottom xl:text-lg lg:text-base"
            :for="item.name">{{ item.value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </section>
</template>
<script setup lang="ts" generic="U extends { description: string }, K extends { name: string, value: string }">
const props = defineProps<{
  doowloadJsonData: U | null,
  otherParams: K[] | null
}>()


const textarea = ref<HTMLTextAreaElement | null>(null)

watch(() => props.doowloadJsonData, (newV) => {
  if (newV && textarea.value) {
    if (props.doowloadJsonData &&
      Object.prototype.hasOwnProperty.call(props.doowloadJsonData, modelProp('ProductCard', 'description')) &&
      props.doowloadJsonData.description)
    {
      textarea.value.value = props.doowloadJsonData.description
    }
  }
})
// style
const style = {
  item: 'p-8 w-1/2 xl:p-6 lg:p-4 md:w-full md:p-2'
}
</script>