<template>
    <section class="w-full" v-if="data">
        <CardGridScroll :data="data.item" :container="'xs'">
            <template #default="{ elem, prev, next, listValueScroll }">
                <div class="">
                    <picture class="relative rounded-xl">
                        <template v-for="photo,key in transformData(elem as any)", :key="photo">
                            <source v-if="photo"
                            :srcset="photo"
                            :media="`(max-width: ${key}px)`"
                            :class="className['picture']"
                            lazy="true"
                            class="h-full w-full block ">
                        </template>
                        <img :src="elem.mainPhoto" alt=""
                        class="h-full w-full none /md:block"
                        :class="className['picture']" lazy="true">
                    </picture>
                </div>
            </template>
            <template v-if="viewport.isGreaterOrEquals('sm')"
            #center="{ prev, next, listValueScroll }" >
                <ControlButtonCenterAbsolute v-bind="{ listValueScroll, next, prev }"/>
            </template>
            <template #footer="{ next, prev }">
                <div v-if="viewport.isLessThan('md')">
                    <Flex :justify="'end'" class="gap-x-4">
                        <Button 
                        :appearance="'blue'"
                        :text="common.BUTTON_MORE_DETAILS"
                         class="text-base grow h-12 justify-center"/>
                         <Flex class="gap-x-2">
                             <ButtonArrow @click="prev" class="-scale-100 h-12" />
                             <ButtonArrow @click="next" class="h-12" />
                        </Flex>
                    </Flex>
                </div>
                <div></div>
            </template>
        </CardGridScroll>
    </section>
</template>
<script setup lang="ts">
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import ButtonArrow from '@/components/Templates/Button/ButtonArrow.vue'
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
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
/* purgecss ignore */
.picture {
    object-fit: cover;
    min-width: 100%;
    max-width: 100%;
    border-radius: var(--rounded-base);
    aspect-ratio: 228/101;
}

@media (max-width: 768px) {
    .picture {
        aspect-ratio: 359/584;
    }
}
</style>