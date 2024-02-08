<template>
    <Group class="gap-y-2">
      <Checkbox v-for="item,i in content.data"
      :key="item"
      v-bind="{ name: content.name, id: content.title + item, value: item }"
      :text="item"/>
    </Group>
</template>
  
<script setup lang="ts" generic="U extends { title: string, data: (string | number | undefined)[], name: string }">
import Group from "@/components/UI/Group/Group.vue";
import GroupItem from "@/components/UI/Group/GroupItem.vue";
import Checkbox from "@/components/UI/Checkbox/Checkbox.vue";

const props = defineProps<{ content: U }>()
</script>