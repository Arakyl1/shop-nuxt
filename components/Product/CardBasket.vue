<template>
    <li class=" py-4 sm:py-2 sm:mb-2" v-if="data">
        <div class="flex items-center sm:flex-wrap">

            <img :src="data.img" alt="image product" class="w-14 sm:w-10">
            <div class="pl-6 grow sm:pl-3">
                <NuxtLink :to="`/catalog/${item.id}`"
                class="text-black-500 mb-1 inline-block text-lg sm:text-base sm:mb-0">
                    {{ data.name }}
                </NuxtLink>
                <p class="text-gray-500 text-lg sm:text-base">
                    {{ data.art }}
                </p>

            </div>
            <div class="mr-6 sm:order-last
            sm:w-full sm:mr-0 sm:text-end ">
                <div class="inline-block">

                    <OtherElseQuantitySelection
                    class="md:py-1 md:px-2 grow-0"
                    :quantity-number="item.quantity"
                    :data-quantity="data.quantity"/>
                </div>
            </div>
            

            <button type="button">
                <ClientOnly>
                    <IconClose class="group is-icon-black h-6 w-6 cursor-pointer float-right "
                    @click="basketProd.removeBasketProduct(index)"/>
                </ClientOnly>
            </button>
        </div>  
        
    </li>
</template>
<script setup lang="ts">
import { basketProduct } from "@/pinia/store";
// import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
    item: { id: number, quantity: number},
    index: number
}>()

const basketProd = basketProduct()

const option = ref({
    where: {
        id: props.item.id
    },
    select: {
        id: true,
        name: true,
        art: true,
        price: true,
        img: true,
        quantity: true
    }
})

const { getProduct } = useProduct()
const { data } = await getProduct(option.value, `data_basket_${props.item.id}`)

interface DataProduct {
    id: number,
    name: string,
    art: string,
    maker: string,
    price: number,
    img: string,
    quantity: number
}
</script>