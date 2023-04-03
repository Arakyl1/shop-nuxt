<template>
  <transition name="modal" appear>
      <div v-show="active" ref="modal" @dragover="mathCords"
      @dragstart="dragStart" @dragenter.prevent @dragleave.prevent :draggable="draggable"
      class="fixed inset-1/2 origin-center -translate-y-2/4 -translate-x-2/4 text-left z-50 modal" >
        <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    active: boolean,
    draggable?: boolean
   }>(), {
    active: false,
    draggable: false })

const modal = ref<HTMLElement | null>(null)
const { windowSize: _windowSize } = useStore()
const elementSize = reactive({
  startX: 0,
  startY: 0,
  x: 0,
  y: 0 })

function dragStart({ clientX, clientY, dataTransfer }:DragEvent) {
  elementSize.startX = clientX
  elementSize.startY = clientY
  
  dataTransfer!.effectAllowed = 'move'
  const img = new Image()
  dataTransfer!.setDragImage(img, 0, 0)

  if (modal.value) {
    const { x, y, height, width } = modal.value.getBoundingClientRect()
    elementSize.x = x + width/2
    elementSize.y = y + height/2
  }
}

function mathCords({ clientX, clientY }:DragEvent) {
  const difX = elementSize.startX - clientX
  const difY = elementSize.startY - clientY
  elementSize.startX = clientX
  elementSize.startY = clientY
  elementSize.x -= difX
  elementSize.y -= difY
  
  if (modal.value) {
    const cords = { x: elementSize.x, y: elementSize.y}
    updatePositionElement(modal.value, cords)
  }
  
}

type cords = { x: number, y: number}
function updatePositionElement<T extends HTMLElement>(el:T, cords: cords) {
  let elH: number = el.clientHeight
  let elW: number = el.clientWidth
  let wX: number = window.innerWidth
  let wY: number = window.innerHeight  

  el.style.top = ((elH + cords.y - elH/2) > wY-15) || ((cords.y - elH/2) < 15 ) ? el.style.top : cords.y + 'px'
  el.style.left = ((elW + cords.x - elW/2) > wX-15) || ((cords.x - elW/2) < 15) ? el.style.left : cords.x + 'px'
}

// })
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