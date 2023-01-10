<template>
    <div class="decor-line"></div>
    <div class="py-3">
       <h4 :class="[addClass]">{{ title }}</h4>
       <ul class="">
         <li
           class="mb-1 last:mb-0"
           v-for="item in content"
           :key="item.name"
         >
           <input
             class="mr-2"
             type="checkbox"
             v-model="data"
             :id="item.name"
             :value="item.value"
           />
           <label class="" :for="item.name">
             {{ item.name }}
           </label>
         </li>
       </ul>
     </div>
  
</template>
<script setup lang="ts">

const emit = defineEmits<{
    (e: 'maker-data', id: object):void
}>()
const props = defineProps<{
    title: string,
    content: { name: string, value: string}[] | null,
    reset?: boolean,
    addClass?: string 
}>()
const data = ref([])

// before Update
onBeforeUpdate(() => {
  emit('maker-data', data)
})
// watch
watch(() => props.reset, () => {
  data.value = []
})
</script>