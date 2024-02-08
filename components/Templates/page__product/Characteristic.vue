<template>
    <Card :appearance="'gray'" :container="'xl'" :class="className['body']">
        <Flex :direction="'column'" :align="'flex-start'" class="gap-y-6">
            <Title :text="common.TEXT_SPECIFICATIONS" :tag="'h3'" class="text-black-100" />
            <!-- <h3 class="text-2xl  mb-4
    xl:text-xl xl:mb-3 sm:text-lg sm:mb-2">Характеристики</h3> -->
            <div class="decor-line"></div>
            <Flex :direction="'column'" class="gap-y-4 w-full">
                <div v-for="item in data" class="w-full">
                    <Title :tag="'h4'" :text="item.title" class="text-black-100" :class="className['title']" />
                    <!-- <h4 class="text-xl text-black-100 xl:text-lg sm:text-base
            ">{{ item.title }}</h4>    class=" justify-between py-1.5 xl:py-1" -->
                    <Flex :tag="'ul'" :direction="'column'" class="gap-y-3 w-full">
                        <Flex v-for="elem in item.content" :tag="'li'" :justify="'between'" class="w-full">
                            <p class="text-gray-500 sm:text-sm">{{ elem.name }}</p>
                            <p class="text-black-100 sm:text-sm">{{ elem.value }}</p>
                        </Flex>
                    </Flex>
                </div>
            </Flex>
        </Flex>
    </Card>
</template>
<script setup lang="ts">
import type { ProductCardFull } from '~~/type/intex';
import { PAGE_CATALOG_ID as common } from "@/common/C";
import Title from "@/components/UI/Title/Title.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Card from "@/components/UI/Card/Card.vue";

defineProps<{ data: ProductCardFull['characteristic'] }>()

const className = useCssModule()
</script>

<style lang="css" module>
/* xl:w-9/12 xl:p-6 lg:w-10/12
    md:w-full sm:p-4 */
.body {
    width: calc((100%/3)*2);
}

.title {
    margin-bottom: 0.75rem;
}
</style>