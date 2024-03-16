<template>
    <Flex :tag="'article'"
    :direction="'column'"
    :align="'flex-start'"
    :class="className['body']"
    class="gap-y-4">
        <Flex class="gap-x-4">
            <Image
            :src="data.user.profileImage"
            :alt="data.user.username"
            :square="true"
            :rounded="'full'"
            class="w-12"/>
            <p class="text-md text-gray-500 grow
                        xl:text-lg sm:text-base" :class="className['username']">{{ data.user.username }}</p>
            <Rating :value="data.ranting || 0" :width="16" :readonly="true" class="gap-x-2" />
        </Flex>
        <div>
            <p class="text-black-500 text-md sm:text-base">{{ data.text }}</p>
        </div>
    </Flex>
</template>
<script setup lang="ts">
import type { ProductCardFull } from '~~/type/intex';
import Rating from "@/components/UI/Rating/Rating.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Image from "@/components/UI/Image/Image.vue";

const props = defineProps<{ data: ProductCardFull['reviews'][0] }>()
const className = useCssModule()

</script>

<style lang="css" module>
.body {
    padding-top: 1.5rem;
}
</style>