<template>
    <section v-if="data">
        <slot name="title">
            <Title :text="common?.ADVANTAGES_TITLE" :class="className['head']"/>
        </slot>
        <CardGridScroll :data="data.body" class="relative" :container="'lg'">
            <template #default="{ elem }">
                <div class="h-full">
                    <Flex :direction="'column'" :class="className['card']" class="bg-gray-100 w-full rounded-xl">
                        <Flex :justify="'center'" :class="className['circle']">
                            <img :src="elem.link_img" alt="" class="relative z-20">
                        </Flex>
                        <Title tag="h4" :text="elem.title" :class="className['title']"/>
                        <p class="text-gray-500" :class="className['text']">{{ elem.text }}</p>
                    </Flex>
                </div>
            </template>
            <template v-if="viewport.isGreaterOrEquals('sm')"
            #center="{ prev, next, listValueScroll }" >
                <ControlButtonCenterAbsolute v-bind="{ listValueScroll, next, prev }"/>
            </template>
            <template v-else #footer="{ prev, next, indexActiveButton, updateScrolLeft, listValueScroll }">
                <div :class="className['control-button--mobile']">
                    <ControlItem
                    class="gap-4 justify-center"
                    :data="data.body.length"
                    :indexActiveButton="indexActiveButton"
                    :updateScroll="updateScrolLeft" />
                </div>
            </template>
        </CardGridScroll>
    </section>
</template>

<script setup lang="ts">
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import ControlItem from "@/components/Templates/ControlElements/Item.vue";
import ControlButtonCenterAbsolute from "@/components/Templates/Carousel/ControlButtonCenterAbsolute.vue";
import { PAGE_MAIN as common } from "@/common/C";

const { data } = await useAsyncData('advantages', () => queryContent('/main/advantages').findOne())
const className = useCssModule()
const viewport = useViewport()


</script>

<style lang="css" module>
/* purgecss ignore */
.head {
    margin-bottom: 4rem;
}

.control-button--mobile {
    margin-top: 1rem;
}
.card {
    height: 100%;
    padding: 2rem 1.5rem;
}

.circle {
    position: relative;
    width: 5rem;
    height: 5rem;
    border-radius: 9999px;
    overflow: hidden;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}
.circle::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-color: var(--yellow-500);
    z-index: 10;
}

.title {
    text-align: center;
    margin-bottom: 1.25rem;
}
.text {
    text-align: center;
}
@media screen and (max-width: 1024px) {
    .head {
        margin-bottom: 3.5rem;
    }
    .card {
        padding: 1.5rem 0.75rem;
    }
}

@media screen and (max-width: 768px) {
    .head {
        margin-bottom: 2.75rem;
    }
}

@media screen and (max-width: 640px) {
    .head {
        margin-bottom: 2.25rem;
    }
    .title {
        margin-bottom: 1rem;
    }
    .text {
        text-align: center;
        font-size: var(--text-sm);
    }
}
</style>