<template>
    <footer class="bg-black-300" :class="className['body']">
        <div class="container" v-if="common">
            <!-- Mobile Footer start -->
            <div class="/md:hidden">
                <Group class="gap-8 w-full ">
                    <Flex :justify="'end'" class="w-full">
                        <Button tag="a" :href="`tel:${common.TELEPHONE}`" :text="common.TELEPHONE" class="text-white"/>
                    </Flex>
                    <Flex :justify="'between'" class="w-full">
                        <Paragraph :text="common.WORKING_HOURS" class="text-white" />
                        <Button tag="a" :href="`mailto:${common.MAIL}`" :text="common.MAIL" />
                    </Flex>
                    <Group class="w-full">
                        <template v-for="section in FOOTER_ROUTER">
                            <div class="decor-line"></div>
                            <Accordion class="w-full" >
                                <template #trigger="{ isActive, close, onClick }">
                                    <Flex :justify="'between'" class=" py-4">
                                        <Paragraph :text="section.title" class="text-white" />
                                        <Button
                                        :icon-left="{ icon: 'add-plus', 'size': '16_16' }"
                                        @click="() => isActive ? close() : onClick()" />
                                        </Flex>
                                    </template>
                                    <template #default>
                                        <Group class="gap-3" :class="className['accordion-body']">
                                            <Button v-for="item in section.links"
                                            :key="item.href"
                                            tag="nuxt-link"
                                            :mode="'link'"
                                            :text="item.title"
                                            :to="item.href"
                                            :style="{ '--color': 'var(--gray-300)' }"  />
                                        </Group>
                                    </template>
                                </Accordion>
                            </template>
                            <div class="decor-line"></div>
                        </Group>
                        <Flex class="gap-2.5 w-full">
                            <img src="@/assets/img/iconSocials/whatsApp.png" alt="whatsApp" class="h-6 w-6 pointer">
                            <img src="@/assets/img/iconSocials/vider.png" alt="viber" class="h-6 w-6 pointer">
                            <Paragraph :text="common.SOCIAL_NETWORK" class="text-gray-300 px-1"/>
                        </Flex>
                        
                        <Button :icon-left="{ icon: 'user-outline', size: '18_18' }"
                        :appearance="'blue'"
                        :text="common.BUTTON_TEXT"
                        class="w-full text-bold justify-center"/>
                        
                        <Paragraph :text="common.PAYMENT_METHODS" class="text-md text-white w-full"/>
                        
                        <Flex class="gap-2.5 w-full">
                            <img v-for="item in card" :key="item" :src="`/img/card/${item}.png`" :alt="item" class="" >
                        </Flex>
                        
                        <Paragraph :text="common.FIGCAPTION" class="text-xs text-gray-300 w-full"/>
                    </Group>
                    <!-- Mobile Footer end -->
                </div>

            <!-- Desktop Footer start -->
            <div class="none /md:block">
                <Group class="gap-12">
                    <Grid class="gap-10" :container="'sm'">
                        <Group class="gap-5">
                            <div>
                                <img src="@/assets/img/logo.png" :alt="`Logo market place ${config.public.NAME_APP}`" class="h-9">
                            </div>
                            <Button tag="a" :href="`tel:${common.TELEPHONE}`" :text="common.TELEPHONE" class="text-white"/>
                            <Button tag="a" :href="`mailto:${common.MAIL}`" :text="common.MAIL" class="text-white"/>
                            <Paragraph :text="common.WORKING_HOURS" class="text-white"/>
                            <Paragraph :text="common.ADDRESS" class="text-gray-300"/>
                        </Group>
                        <Group class="gap-5">
                            <Title :text="FOOTER_ROUTER[0].title" :tag="'h4'" class="text-white"/>
                            <Group class="gap-2.5">
                                <Button v-for="item in FOOTER_ROUTER[0].links"
                                :key="item.title"
                                tag="nuxt-link"
                                :text="item.title"
                                :to="item.href"
                                :mode="'link'"
                                :style="{ '--color': 'var(--gray-300)' }" />
                            </Group>
                        </Group>
                        <Group class="gap-6.5">
                            <Group class="gap-5" v-for="section in FOOTER_ROUTER.slice(1,3)">
                                <Title :text="section.title" :tag="'h4'" class="text-white"/>
                                <Group class="gap-2.5">
                                    <Button v-for="item in section.links"
                                    :key="item.href"
                                    :mode="'link'"
                                    tag="nuxt-link"
                                    :text="item.title"
                                    :to="item.href"
                                    :style="{ '--color': 'var(--gray-300)' }"  />
                                </Group>
                            </Group>
                        </Group>
                        <Group class="gap-7.5">
                            <Flex class="gap-2.5 w-full">
                                <img src="@/assets/img/iconSocials/whatsApp.png" alt="whatsApp" class="h-6 w-6 pointer">
                                <img src="@/assets/img/iconSocials/vider.png" alt="viber" class="h-6 w-6 pointer">
                                <Paragraph :text="common.SOCIAL_NETWORK" class="text-gray-300 px-1"/>
                            </Flex>

                            <Button :icon-left="{ icon: 'user-outline', size: '18_18' }"
                            :appearance="'blue'"
                            :text="common.BUTTON_TEXT"
                            class="w-full px-4 text-bold justify-center /md:h-12"/>

                            <Paragraph :text="common.PAYMENT_METHODS" class="text-md text-white w-full"/>

                            <Flex class="gap-2.5 w-full flex-wrap">
                                <img v-for="item in card" :key="item" :src="`/img/card/${item}.png`" :alt="item" class="" >
                            </Flex>
                        </Group>
                    </Grid>
                    <Paragraph :text="common.FIGCAPTION" class="text-xs text-gray-300 w-full"/>
                </Group>
            </div>
            <!-- Desktop Footer end -->
        </div>
    </footer>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Grid from "@/components/UI/Grid/Grid.vue";
import Group from "@/components/UI/Group/Group.vue";
import Title from "@/components/UI/Title/Title.vue";
import Paragraph from "@/components/UI/Paragraph/Paragraph.vue";
import Button from "@/components/UI/Button/Button.vue";
import Accordion from "@/components/UI/Accordion/Accordion.vue";
import { FOOTER_ROUTER } from "@/utils/router";
import { FOOTER as common } from "@/common/C";


const config = useRuntimeConfig()
const className = useCssModule()
const card: readonly string[] = ['maestro', 'master', 'mir', 'visa']
</script>
<style lang="css" module>
/* purgecss ignore */
.body {
    padding: 2rem 0;
}
.accordion-body {
    margin-bottom: 1rem;
}
/* Desktop style start */
.desktop {
    display: none;
}
/* Desktop style end */
@media (min-width: 768px) {
   .mobile {
        display: none !important;
   } 
   .desktop {
        display: block;
    }
   .body {
        padding: 3.375rem  0 3.125rem 0;
   }
}

</style>