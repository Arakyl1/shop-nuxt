<template>
    <div class="w-3/4 lg:w-2/3 md:w-full">
        <!-- <div  class="flex justify-center mt-32">
            <IconLoader />
        </div> -->
        

        
        <div class="flex flex-wrap" v-show="loader || listIdProduct.length">
            <template v-for="(el,i) in lengthArr" :key="el">
                <MoleculesItemProductCard :data="listIdProduct[i] || null"
                    class="group is-pos-info-for-stock w-1/3 mb-10 lg:w-1/2 md:w-1/3 sm:w-1/2 slader__item">
                    <template #bt-favorite="{ content }" >
                        <ClientOnly>
                            <AtomButtonStandart class="group p-1" @click="addFatoriteItem(content.id)"
                                :class="[checkIdInFavorites(content.id).value ? 'icon-red' : 'icon-black']">
                                <IconLike class="h-7" />
                            </AtomButtonStandart>
                        </ClientOnly>
                    </template>

                    <template #bt-basket="{ content }" >
                        <AtomButtonStandart
                        v-if="content && !isNumber(content)"
                        @click="addBasket({
                            id: content.id,
                            quantity: 1,
                            price: content.sale ? Math.floor(content.price * 0.9) : content.price
                        })" class="flex bg-blue-500  justify-center items-center"
                        :disabled="!checkProductAvailability(content)">
                            <IconBasketSmall class="group icon-white" />
                            <p class="text-white ml-2">В корзину</p>
                        </AtomButtonStandart>
                    </template>
                </MoleculesItemProductCard>
            </template>
        </div>
        <Transition name="gallery">
        <div v-show="!loader && !listIdProduct.length">
            <p class="text-2xl text-gray-500 p-8 lg:text-xl sm:text-lg sm:p-4"
            >По вашему запросу ничего не найденно</p>
        </div>
    </Transition>
    </div>
</template>

<script setup lang="ts">
import type { _ProductCardBase } from "@/type/intex";

const { addBasket } = useBasket()
const route = useRoute()
const { checkIdInFavorites, addFatoriteItem } = useFavorite()
const props = defineProps<{ listIdProduct: _ProductCardBase[], loader: boolean }>()

const lengthArr = computed(() => props.loader ? Number(route.query.limit) : props.listIdProduct.length)
</script>

<style lang="css">
.gallery-enter-active {
  transition: all 0.35s ease-out;
}

.gallery-leave-active {
  transition: all 0s;
}

.gallery-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.gallery-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>