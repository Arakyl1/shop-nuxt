<template>
    <div>
        <form @click="input?.click()">
            <input
            type="file"
            accept="image/png, image/jpeg, image/webp" ref="input"
            hidden
            :multiple="multiple"
                @change="imageChange($event)">
            <div v-if="!inputImage">
                <slot>
                </slot>
            </div>
            <div v-else class="aspect-square">
                <img :src="inputImage" alt="" class="max-w-full max-h-full object-cover ">
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { type ResponseDownloadImage } from "@/composables/useImage";

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
const { doowload } = useImage()

async function imageChange({ target }: Event) {
    const _target = target as unknown as HTMLInputElement
    if (!_target.files) return
    const files = _target.files   

    const response = await Promise.all(Object.values(files).map(async(elem) => doowload(elem)))
    const imagesLink = response.flat()
  
    function filterArray<T>(arr:T[]): NonNullable<T>[] {
        return arr.filter(el => el !== null) as NonNullable<T>[]
    }

    const _imagesLink = filterArray(imagesLink)
    
    if (_imagesLink.length) {
       emit('linkImg', _imagesLink)
    }
}
</script>