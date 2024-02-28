<template>
    <div @click="input?.click()">
        <input
        type="file"
        accept="image/png, image/jpeg, image/webp" ref="input"
        hidden
        :multiple="multiple"
        @change="onChange($event)">
        <div v-if="!inputImage">
            <slot>
            </slot>
        </div>
        <div v-else class="aspect-square">
            <img :src="inputImage" alt="" class="max-w-full max-h-full object-cover ">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ResponseDownloadImage } from '~~/type/intex'

const props = withDefaults(defineProps<{
    multiple: boolean,
    inputImage: string | null
}>(), {
    multiple: false,
    inputImage: null
})
const emit = defineEmits<{
    (e: 'linkImg', value: (ResponseDownloadImage)[]): void
}>()

const input = ref<HTMLInputElement | null>(null)
const { download: _download } = useImage()

async function onChange({ target }: Event) {
    const _target = target as unknown as HTMLInputElement
    if (!_target.files) return
    const res = await _download(_target.files)
    if (res && res.length) {
       emit('linkImg', res)
    }
}
</script>