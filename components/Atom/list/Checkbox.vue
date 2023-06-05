<template>
  <section>
    <div class="decor-line"></div>
    <fieldset class="py-3">
      <slot name="title"></slot>
      <ul class="">
        <li class="mb-1 last:mb-0" v-for="item,i in content" :key="item.title">
          <slot name="item" v-bind="{ item, i }">
            <input class="mr-2" type="checkbox" :name="item.name" :id="item.title" :value="item.value" ref="input" />
            <label class="" :for="item.title">
              {{ item.title }}
            </label>
          </slot>
        </li>
      </ul>
    </fieldset>
  </section>
</template>

<script setup lang="ts" generic="U extends PP">
// type PP = { name: string, value: string }
import { PP } from '~~/type/intex';

const props = defineProps<{
  content: U[],
  reset?: boolean,
}>()

const input = ref<HTMLInputElement[] | null>(null)

// watch
watch(() => props.reset, () => {
  if (!input.value) return
  input.value.forEach(_ => {
    _.checked = false
  })
})
</script>