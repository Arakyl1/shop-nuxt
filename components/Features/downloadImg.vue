<template>
    <div>

        <form @click="input?.click()">
            <input type="file" accept="image/png, image/jpeg" ref="input" hidden @change="imageChange($event)">
            <div v-if="!inputImage">
                <slot>
                </slot>
            </div>
            <div v-else class="aspect-square">
                <img :src="inputImage.toString()" alt="" class="min-w-full min-h-full object-cover aspect-square">
            </div>
        </form>
    </div>

</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ reset: boolean }>(), { reset: false })
const emit = defineEmits<{
    (e: 'linkImg', value: string): void
}>()

const input = ref<HTMLInputElement | null>(null)
const inputImage = ref<string | ArrayBuffer | null>(null)

async function imageChange({ target }: Event) {
    const _target = target as unknown as HTMLInputElement
    
    if (!_target.files) return
    const file = _target.files[0]

    const reader = new FileReader()    
    reader.onload = ({ target }: ProgressEvent<FileReader>) => {
        if (!target) return
        inputImage.value = target.result
    }
    reader.readAsDataURL(file)

    type ResponseDownloadImage = ({ url: string; secretUrl: string; } | "Error")[]

    const { data } = await useFetch<ResponseDownloadImage>('/api/cloudinari/upload', {
        method: "POST",
        body: file,
        headers: {
            "Content-Type": "application/octet-stream"
        }
    })
    if (data.value) {
        for (let i = 0; i < data.value.length; i++) {
            const el = data.value[i];
            if (el !== 'Error') {
                emit('linkImg', el.secretUrl)   
            }
        }
    }
}

watch(() => props.reset, () => { inputImage.value = '' })
</script>