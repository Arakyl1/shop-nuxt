<template>
    <ul class="">
      <li class="mb-1 last:mb-0 flex items-center justify-start" v-for="item, i in content.data" :key="item">
        <slot name="item" v-bind="{ content, item, i }">
            <AtomFormCheckbox :attr="{ name: content.name, id: content.title + item, value: item }" class="h-4"/>
          <label class="pl-2" :for="content.title + item">
            {{ item }}
          </label>
        </slot>
      </li>
    </ul>
  </template>
  
  <script setup lang="ts" generic="U extends { title: string, data: (string | number | undefined)[], name: string }">

  const props = defineProps<{ content: U }>()
  </script>