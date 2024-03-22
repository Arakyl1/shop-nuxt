<template>
    <Card :appearance="'gray'" :container="'xl'" :class="className['body']">
        <Group class="gap-6">
            <Title :text="common.TEXT_SPECIFICATIONS" :tag="'h3'" class="text-black-100" />
            <div class="decor-line"></div>
            <Group class="gap-4 w-full">
                <div v-for="item in data" class="w-full">
                    <Title :tag="'h4'" :text="item.title" class="text-black-100" :class="className['title']" />
                    <Flex :tag="'ul'" :direction="'column'" class="gap-3 w-full">
                        <Flex v-for="elem in item.content" :tag="'li'" :justify="'between'" :align="'flex-start'" class="w-full">
                            <p class="text-gray-500 w-1/2">{{ elem.name }}</p>
                            <div class="grow"></div>
                            <p class="text-black-100">{{ elem.value.replace(/\//g,', ') }}</p>
                        </Flex>
                    </Flex>
                </div>
            </Group>
        </Group>
    </Card>
</template>
<script setup lang="ts">
import type { ProductCardFull } from '~~/type/intex';
import { PAGE_CATALOG_ID as common } from "@/common/C";
import Title from "@/components/UI/Title/Title.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Card from "@/components/UI/Card/Card.vue";

defineProps<{ data: ProductCardFull['characteristic'] }>()

const className = useCssModule()
</script>

<style lang="css" module>
@media screen and  (min-width: 1024px) {
    .body {
        width: 75%;
    }
}
.title {
    margin-bottom: 0.75rem;
}
</style>