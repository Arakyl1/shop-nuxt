<template>
 <p class="text-white absolute py-1 px-3 rounded-r uppercase"
    v-if="news || sell"
    :class="{ 'bg-yellow-500': news, 'bg-red-500': sell && !news }"
    >
      {{ news ? 'news' : sell ? 'sell' : '' }}
  </p>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ news: boolean, sell: boolean}>(), { news: false, sell: false })
</script>