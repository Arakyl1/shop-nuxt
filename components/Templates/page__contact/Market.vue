<template>
    <section>
        <ContentDoc path="/contact/slider" v-slot="{ doc }">
            <CardGridScroll :data="doc.body" class="relative" :container="'lg'">
                <template #default="{ elem }">
                    <div>
                        <ClientOnly>
                            <img :src="elem.img" alt="Market photo" class="object-cover w-full">
                        </ClientOnly>
                        <p class="py-2 lg:text-sm /md:text-base">{{ elem.adress }}</p>
                    </div>
                </template>
                <template v-if="viewport.isGreaterOrEquals('sm')"
                #center="{ prev, next, listValueScroll }" >
                    <ControlButtonCenterAbsolute v-bind="{ listValueScroll, next, prev }"/>
                </template>
                <template v-else #footer="{ prev, next, indexActiveButton, updateScrolLeft, listValueScroll }">
                    <div :class="className['control-button--mobile']">
                        <ControlItem
                        class="gap-4"
                        :data="data.body.length"
                        :indexActiveButton="indexActiveButton"
                        :updateScroll="updateScrolLeft" />
                    </div>
                </template>
            </CardGridScroll>
        </ContentDoc>
    </section>
</template>

<script setup lang="ts">
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import ButtonArrow from '@/components/Templates/Button/ButtonArrow.vue'
import ControlItem from "@/components/Templates/ControlElements/Item.vue";
import ControlButtonCenterAbsolute from "@/components/Templates/Carousel/ControlButtonCenterAbsolute.vue";


const viewport = useViewport()
const className = useCssModule()

</script>

<style lang="css" module>
/* purgecss ignore */
.control-button--mobile {
    margin-top: 1rem;
}
</style>