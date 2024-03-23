<template>
    <section>
        
        <CardGridScroll :data="data.body" class="relative" :container="'lg'">
            <template #default="{ elem }">
                <div>
                    <img :src="elem.img" alt="Market photo" class="object-cover w-full" loading="lazy" >
                    <p class="py-2 text-sm">{{ elem.adress }}</p>
                </div>
            </template>
            <template v-if="viewport && viewport.breakpoint.value === 'xs'"
            #footer="{ prev,  next, indexActiveButton, updateScrolLeft, listValueScroll }">
                <div :class="className['control-button--mobile']">
                    <ControlItem
                    class="gap-4"
                    :data="data.body.length"
                    :indexActiveButton="indexActiveButton"
                    :updateScroll="updateScrolLeft" />
                </div>
            </template>
            <template v-else-if="viewport"
            #center="{ prev, next, listValueScroll }" >
                <ControlButtonCenterAbsolute
                v-bind="{ listValueScroll, next, prev }"
                :class="className['control-button']"/>
            </template>
           
        </CardGridScroll>
    </section>
</template>

<script setup lang="ts">
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue';
import ControlButtonCenterAbsolute from "@/components/Templates/Carousel/ControlButtonCenterAbsolute.vue";
import ControlItem from '@/components/Templates/ControlElements/Item.vue';

const { data } = await useAsyncData('market', () => queryContent('/contact/slider').findOne())
const viewport = useViewport()
const className = useCssModule()

</script>

<style lang="css" module>
.control-button {
    top: 120px;
}
.control-button--mobile {
    margin-top: 1rem;
}

@media screen and (min-width: 769px) {
    .control-button {
        top: 100px;
    }
}

</style>