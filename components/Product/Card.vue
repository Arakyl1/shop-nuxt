<template>
<div v-if="data" class="flex">
    <div class="w-full flex flex-col">
        <div class="w-full aspect-square bg-gray-100 rounded-md relative">
            
                <OtherProductInfoForStock :sell="data.sale" :news="data.news"
                class="top-4 left-4 z-10 sm:text-xs sm:py-0 sm:px-2
                group-[.is-pos-info-for-stock]:left-0 "/>
            
            <div class="absolute z-20 right-3 top-3 sm:scale-75 sm:top-1.5 sm:right-1.5">
                <ButtomAddFavorite :id="data.id" class="p-0.5"/>
            </div>
            <div class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-8 flex items-center justify-center z-0">
                <NuxtLink :to="`/catalog/${data.id}`" class="w-full h-full">
                    <img :src="data.img" alt="product_image" class="object-contain max-w-full max-h-full">
                </NuxtLink>
            </div>
        </div>
        <div class="py-4 grow flex flex-col sm:py-2">
            <p class="text-gray-500 text-lg truncate sm:text-sm"
            >{{ data.art }}</p>
            <p class="text-lg text-black-700 mb-2 grow xl:text-base sm:text-sm sm:mb-1"
            >{{ data.name }}</p>
            <div class="flex items-center justify-between">
                
                    <OtherTransformPrice :price="data.price" :sale="data.sale" :style="style"
                    class="grow"/>
                    <IconStatic class="sm:hidden"/>
                
            </div>
        </div>
        <ButtomAddBasket :id="data.id" class="w-full sm:text-sm group is-icon sm:py-2.5"/>
    </div>
</div>
</template>
<script setup lang="ts">

const props = defineProps<{
    data?: {
        id: number,
        name: string,
        art: string,
        price: number,
        img: string,
        news: boolean,
        sale: boolean,
        quantity: number
    },
    id?: number
}>()

const data = ref(props?.data)
const { getProduct } = useProduct()

if (!props.data && props.id) {
    data.value = await getData(props.id)
}

async function getData(id:number) {
    const { data } = await getProduct({ where: { id: id}, ...selectForCard()})
    return data.value
}

const style = "text-2xl lg:text-xl md:text-base"
</script>