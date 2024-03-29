<template>
    <Group class="gap-6" :class="className['body']">
        <Title :tag="'h3'" :text="common.TITLE"/>
        <div class="decor-line"></div>
        <Group v-if="basketLength" class="gap-3 grow  w-full">
            <Group class="grow w-full">
                <BasketCard v-for="item in basket!.item"
                    :key="item.cardId"
                    :data="item"/>
            </Group>
            <div class="decor-line"></div>
            <p class="text-md font-medium text-blue-500"
            >{{ common.TOTAL_SUM + transformPrice('ru', { currency: 'BYN', style: 'currency' }, totalOrderAmount) }}</p>
        </Group>
        <p v-else class="text-lg text-gray-700">{{ common.EMPTY_CONTENT }}</p>
    </Group>
</template>

<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import BasketCard from "@/components/Templates/Card/Basket.vue";
import { user as _user } from "@/stores/user";
import { MODAL_BASKET as common } from "@/common/C";


const storeUser = _user()
const { basket, basketLength } = storeToRefs(storeUser)
const className = useCssModule()

const totalOrderAmount = computed(() => basket.value ? basket.value.item.reduce((s, i) => s + ((i.card.price * ((100 - i.card.discount) / 100)) * i.count), 0) : 0)


function transformPrice(reg:string, option: object, price:number):string {
    return new Intl.NumberFormat(reg, { minimumFractionDigits: 0, ...option }).format(price)
}

</script>


<style lang="css" module>
.body {
    /* max-width: 900px; */
    width: 940px;
    aspect-ratio: 5/3;
    /* min-width: 100%; */
}


@media (max-width: 768px) {
    .body {
        width: 100%;
        aspect-ratio: auto;
        height: 100%;
    }
}
</style>