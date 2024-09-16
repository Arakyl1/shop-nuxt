<template>
    <section class="w-full" :class="$style.body">
        <Transition name="fade" :duration="250" :mode="'out-in'" >

            <UITBlockGridScroll v-if="!pending" :data="data?.item" :container="'xs'">
                <template #default="{ elem }">
                    <div class="">
                        <picture class="relative rounded-xl block">
                            <template v-for="photo,key in transformData(elem as never)":key="photo" ,>
                                <source v-if="photo"
                                :srcset="photo"
                                :media="`(max-width: ${key}px)`"
                                class="h-full w-full">
                            </template>
                            <img :src="elem.mainPhoto" alt=""
                            class="h-full w-full" >
                        </picture>
                    </div>
                </template>
                <template v-if="viewport.isGreaterOrEquals('md')"
                #center="{ prev, next, listValueScroll }" >
                    <ControlButton v-bind="{ listValueScroll, next, prev }"/>
                </template>
                <template v-if="viewport.isLessThan('md')" #footer="{ next, prev, listValueScroll }">
                    <UITBlockFlex :justify="'end'" class="gap-4">
                        <UITButton 
                        :mode="'blue'"
                        :text="t('PAGE_MAIN.BUTTON_MORE_DETAILS')"
                        :height="'h-10'"
                        class="grow justify-center /md:h-12"/>
                        <UITBlockFlex class="gap-2" :width-full="false">
                            <AtomButtonArrow class="-scale-100" :disabled="listValueScroll.current === 0" @click="prev" />
                            <AtomButtonArrow :disabled="listValueScroll.current >= listValueScroll.max" @click="next" />
                        </UITBlockFlex>
                    </UITBlockFlex>
                </template>
            </UITBlockGridScroll>
            <UITSkeleton v-else :loader="pending" :animated="true" class="h-full" />
        </Transition>
    </section>
</template>
<script setup lang="ts">
import { UITBlockGridScroll, UITBlockFlex, UITButton, UITSkeleton } from '#components';
import AtomButtonArrow from "@/components/Atom/Button/Arrow.vue";
import ControlButton from "@/components/Templates/Carousel/Control/ButtonsCenter.vue";
import { t } from "#imports";
// import { isServer } from "@/utils/other";

const { data, pending } = await useFetch('/api/mainSlider/data', { server: false })
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
    border-radius: var(--rounded-xl);
}

@media (max-width: 768px) {
    .body {
        aspect-ratio: 359/584;
    }
}

</style>