<template>
    <section class="w-full" :class="className['body']">
        <CardGridScroll v-if="data" :data="data.item" :container="'xs'">
            <template #default="{ elem }">
                <div class="">
                    <picture class="relative rounded-xl block">
                        <template v-for="photo,key in transformData(elem as any)", :key="photo">
                            <source v-if="photo"
                            :srcset="photo"
                            :media="`(max-width: ${key}px)`"
                            lazy="true"
                            class="h-full w-full">
                        </template>
                        <img :src="elem.mainPhoto" alt=""
                        class="h-full w-full" lazy="true">
                    </picture>
                </div>
            </template>
            <template v-if="viewport.isGreaterOrEquals('md')"
            #center="{ prev, next, listValueScroll }" >
                <ControlButtonCenterAbsolute v-bind="{ listValueScroll, next, prev }"/>
            </template>
            <template #footer="{ next, prev }" v-if="viewport.isLessThan('md')">
                <Flex :justify="'end'" class="gap-4">
                    <Button 
                    :appearance="'blue'"
                    :text="common.BUTTON_MORE_DETAILS"
                     class="grow justify-center"/>
                     <Flex class="gap-2">
                         <ButtonArrow @click="prev" class="-scale-100" />
                         <ButtonArrow @click="next" />
                    </Flex>
                </Flex>
            </template>
        </CardGridScroll>
        <Skeleton v-else :animated="true" class="h-full"/>
    </section>
</template>
<script setup lang="ts">
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import ButtonArrow from '@/components/Templates/Button/ButtonArrow.vue'
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
import Skeleton from "@/components/UI/Skeleton/Skeleton.vue";
import ControlButtonCenterAbsolute from "@/components/Templates/Carousel/ControlButtonCenterAbsolute.vue";
import { PAGE_MAIN as common } from "@/common/C";

const { data } = await useFetch('/api/mainSlider/data', { server: true })
const className = useCssModule()
const viewport = useViewport()

function transformData(item: NonNullable<typeof data.value>['item'][0]) {
    return { 1024: item.main1024, 768: item.main768, 600: item.main600 }
}
</script>

<style lang="css" module>
.body {
    aspect-ratio: 228/101;
}


.picture > * {
    object-fit: cover;
    min-width: 100%;
    max-width: 100%;
    border-radius: var(--rounded-base);
}

@media (max-width: 768px) {
    .body {
        aspect-ratio: 359/584;
    }
}

</style>