<template>
 <p class="text-white absolute py-1 px-3 rounded-r uppercase"
    v-if="news || discount"
    :class="{ 'bg-yellow-500': news && !discount, 'bg-red-500': discount }"
    >
      {{ discount ? 'sell' : news ? 'news' : '' }}
  </p>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ news: boolean, discount: boolean}>(), { news: false, discount: false })
</script>