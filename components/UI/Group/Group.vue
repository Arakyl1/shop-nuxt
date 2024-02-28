<template>
    
  <Flex :direction="'column'" :align="'align'" ref="group" v-bind="{ ...props }">
      <slot></slot>
  </Flex>
</template>

<script setup lang="ts">
import { default as Flex, type Props as FlexProps } from "@/components/UI/Flex/Flex.vue";

interface Props extends Partial<Omit<FlexProps, |'direction'>> {}

const props = withDefaults(defineProps<Props>(), { align: 'flex-start' })
// const flex = ref<InstanceType<typeof FlexCard> | null>(null)
// const instanse = getCurrentInstance()
//const group = ref<HTMLElement | null>()
// const gap = ref<string>('0')

// onMounted(() => {
//     getGap()
//     window.addEventListener('resize', getGap)
// })

// function getGap() {
//   console.log(group.value.get())
//     if (group.value instanceof HTMLElement) {
//       console.log(getComputedStyle(group.value))
//         gap.value = getComputedStyle(group.value).gap.split(' ')[0]
//     }
// }
</script>

