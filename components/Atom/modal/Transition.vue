<template>
  <transition name="modal" appear>
  
      <div class="fixed inset-1/2 origin-center -translate-y-2/4 -translate-x-2/4 text-left z-50 modal" v-show="active">
        <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ active: boolean }>(), { active: false })
</script>

<style lang="css">
.modal-leave-to,
.modal-enter-from {
  opacity: 0;
  transition: all 0.3s ease;
}

.modal-enter-from > *,
.modal-leave-to > * {
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>