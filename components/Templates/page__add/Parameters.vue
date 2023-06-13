<template>
<section class="bg-gray-100 p-8 xl:p-6 lg:p-4">
    <div class="flex flex-wrap">
        <fieldset :class="style.item">
            <legend class="text-3xl xl:text-2xl lg:text-xl">Описание товара</legend>
            <div class="decor-line my-6 xl:my-4"></div>
              <textarea :name="modelProp('ProductCard','description')"
              autocapitalize="words"
                class="bg-white p-6 w-full h-80 border border-gray-300 border-solid rounded focus-visible:outline-0"
                ></textarea>
        </fieldset>
        <fieldset :class="style.item">
            <legend class="text-3xl xl:text-2xl lg:text-xl">Дополнительные опции</legend>
            <div class="decor-line my-6 xl:my-4"></div>
            <ul class="flex flex-wrap">
              <li v-for="item in dataOption"
                :key="item.name"
                class="inline-block grow mb-4" >
                <input
                  type="checkbox"
                  :id="item.name"
                  :name="item.name"
                  value="true"
                  class="h-5 w-5 lg:w-4 lg:h-4"
                />
                <label class="pr-3 pl-2 text-xl align-bottom xl:text-lg lg:text-base"
                  :for="item.name">{{ item.label }}</label>
            </li>
            </ul>
        </fieldset>
    </div>
</section>
</template>
<script setup lang="ts">
import { Prisma } from "@prisma/client";

type ProKey = Prisma.ProductCardScalarFieldEnum

const props = defineProps<{create?: boolean}>()
const input = ref<HTMLInputElement[] | null>(null)

type ProductCardOption= { name: ProKey, label: string }
const dataOption: ProductCardOption[] = [
  { name: modelProp('ProductCard','top'), label: 'Топ' },
  { name: modelProp('ProductCard','sale'), label: 'Скидка' },
  { name: modelProp('ProductCard','news'), label: 'Новый' },
  { name: modelProp('ProductCard','delivery'), label: 'Доставка' },
  { name: modelProp('ProductCard','pickUp'), label: 'Самовывоз' },
  { name: modelProp('ProductCard','underTheOrder'), label: 'Под заказ' },
]


// watch
watch(() => props.create, () => {

})
// style
const style = {
    item: 'p-8 w-full w-1/2 xl:p-6 lg:p-4 md:w-full md:p-2'
}
</script>