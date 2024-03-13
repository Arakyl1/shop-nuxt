<template>
    <section class=" w-full">
        <CardGridScroll :data="data ? data.body : null" :container="'xs'">
            <template #default="{ elem, prev, next, listValueScroll }">
                <template v-if="elem">
                    <div class="relative">
                        <picture>
                            <source :srcset="elem.link_img_small" media="(max-width: 768px)" :class="className['picture']">
                            <img :src="elem.link_img_big" alt="" :class="className['picture']">
                        </picture>
                        <div :class="className['content']" >
                            <p :class="[className['title'], elem.title_col]">{{ elem.title }}</p>
                            <p :class="[className['text']]" class="text-gray-300 ">{{ elem.text }}</p>
                            <Flex class="gap-x-4" v-if="!viewport.isLessThan('md')">
                                <Button
                                :appearance="'blue'"
                                :text="common.BUTTON_MORE_DETAILS"
                                class="px-16 h-12 text-base"
                                :class="className['control-button']"/>
                                <Flex class="gap-x-2" v-if="listValueScroll.max > 0">
                                    <ButtonArrow
                                    @click="prev"
                                    class="-scale-100 h-12"
                                    :class="className['control-button']"/>
                                    <ButtonArrow
                                    @click="next"
                                    class="h-12"
                                    :class="className['control-button']"/>
                                </Flex>
                            </Flex>
                        </div>
                    </div>
                </template>
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
import { PAGE_MAIN as common } from "@/common/C";

const { data } = await useAsyncData('main-slader', () => queryContent('/main/slader').findOne())
const className = useCssModule()
const viewport = useViewport()

</script>

<style lang="css" module>
.picture {
    object-fit: cover;
    min-width: 100%;
    max-width: 100%;
    border-radius: var(--rounded-base);
    aspect-ratio: 228/101;
}

.content {
    position: absolute;
    width: 40%;
    height: min-content;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
}

.title {
    font-size: 4rem;
    font-weight: bold;
}
.text {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
}
.control-element-left {
    transform: scale(-1);
}

@media (max-width: 1024px) {
    .content {
        width: 50%;
    }
    .title {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }
    .text {
        font-size: 1rem;
        margin-bottom: 0.75rem;
    }
    .control-button {
        height: 2.5rem;
    }
}


@media (max-width: 768px) {
    .picture {
        aspect-ratio: 60/97;
    }

    .content {
        width: calc((100%/12) * 10);
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }
    .title {
        font-size: 4rem;
        margin-bottom: 1.5rem;
    }
    .text {
        font-size: 1.5rem;
    }
}
@media (max-width: 640px) {
    .content {
        width: calc((100%/12) * 11);
        top: 25%;
    }
    .title {
        font-size: 2rem;
    }
    .text {
        font-size: 1.125rem;
    }
}
</style>