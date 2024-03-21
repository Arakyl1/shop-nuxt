<template>
    <Card :appearance="'gray'" :container="'xl'">
        <Flex :direction="'column'"
        :align="'flex-start'"
        class="gap-6">
            <Title :tag="'h3'"
            :text="common.TEXT_DESCRIPTION"
            class="text-black-100" />
            <!-- <h3 class="text-xl text-black-100 sm:text-lg">Описание</h3> -->
            <div class="decor-line"></div>
            <p class="text-gray-500 sm:text-sm">{{ data.description }}</p>
        </Flex>
    </Card>
</template>
<script setup lang="ts">
import type { ProductCardFull } from '~~/type/intex';
import { PAGE_CATALOG_ID as common } from "@/common/C";
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import Card from "@/components/UI/Card/Card.vue";

interface Props {
    data: ProductCardFull,
}

const props = defineProps<Props>()
</script>
