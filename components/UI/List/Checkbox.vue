<template>
    <Group class="gap-2">
      <Checkbox v-for="item,i in content.data"
      :key="item"
      :attr="{
        id: content.title + item,
        name: content.name,
        value: item,
      }"
      :text="item"/>
    </Group>
</template>
  
<script setup lang="ts" generic="U extends { title: string, data: (string | number | undefined)[], name: string }">
import Group from "@/components/UI/Group/Group.vue";
import Checkbox from "@/components/UI/Checkbox/Checkbox.vue";

const props = defineProps<{ content: U }>()
</script>