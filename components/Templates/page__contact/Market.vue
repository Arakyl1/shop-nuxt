<template>
    <section>
        <ContentDoc path="/contact/slader" v-slot="{ doc }">
            <CardGridScroll :data="doc.body" class="relative" :container="'lg'">
                <template #default="{ elem }">
                    <div>
                        <ClientOnly>
                            <img :src="elem.img" alt="market_foto" class="object-cover w-full">
                        </ClientOnly>
                        <p class="py-2 lg:text-sm md:text-base">{{ elem.adress }}</p>
                    </div>
                </template>
                <template v-if="viewport.isGreaterOrEquals('sm')"
                #center="{ prev, next, listValueScroll }" >
                    <template v-if="listValueScroll.max > 0">
                        <ButtonArrow
                        :class="className['control-button--left']"
                        :disabled="listValueScroll.current === 0"
                        @click="prev"
                        class="h-11"/>
                        <ButtonArrow
                        :class="className['control-button--right']"
                        :disabled="listValueScroll.current >= listValueScroll.max"
                        @click="next"
                        class="h-11"/>
                    </template>
                </template>
                <template v-else #footer="{ prev, next, indexActiveButton, updateScrolLeft, listValueScroll }">
                    <div :class="className['control-button--mobile']">
                        <ControlItem
                        class="gap-x-4"
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


const viewport = useViewport()
const className = useCssModule()

</script>

<style lang="css" module>
.control-button--left {
    position: absolute;
    transform: translate(-50%, -50%) scale(-1);
    top: 35%;
    left: 0rem;
}
.control-button--right {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 35%;
    left: 100%;
}
.control-button--mobile {
    margin-top: 1rem;
}
</style>