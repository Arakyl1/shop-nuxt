<template>
    <footer class="bg-black-300" :class="$style.body">
        <div class="container mx-auto">
            <!-- Mobile Footer start -->
            <div class="md:hidden">
                <UITBlockGroup class="gap-8 w-full ">
                    <UITBlockFlex :justify="'end'">
                        <UITButton tag="a" :href="`tel:${t('BASIC_INFORMATION.TELEPHONE')}`" :text="t('BASIC_INFORMATION.TELEPHONE')" :mode="'link-white'" class="text-md"/>
                    </UITBlockFlex>
                    <UITBlockFlex :justify="'between'">
                        <UITParagraphText :text="t('BASIC_INFORMATION.WORKING_HOURS')" :color="'white'" :size="'md'" />
                        <UITButton tag="a" :href="`mailto:${t('BASIC_INFORMATION.MAIL')}`" :text="t('BASIC_INFORMATION.MAIL')" :mode="'link-white'" class="text-md" />
                    </UITBlockFlex>
                    <UITBlockGroup class="-mx-4 w-[calc(100%+2rem)]" :width-full="false">
                        <template v-for="section in FOOTER_ROUTER" :key="section.title">
                            <div class="decor-line"/>
                            <UITFormAccordion class="w-full px-4">
                                <template #trigger="{ isActive, close, onClick }">
                                    <UITButton
                                        :mode="'white-icon'"
                                        :text="section.title"
                                        :height="'h-14'"
                                        :rounded="'n'"
                                        :icon-right="{ icon: 'add-plus', 'size': '16_16', type: 'monocolor' }"
                                        class="text-md justify-between w-full"
                                        @click="() => isActive ? close() : onClick()" />
                                    </template>
                                    <template #default>
                                        <UITBlockGroup class="gap-3" :class="$style['accordion-body']">
                                            <UITButton
                                            v-for="item in section.links"
                                            :key="item.href"
                                            tag="nuxt-link"
                                            :mode="'link'"
                                            :text="item.title"
                                            :to="item.href"
                                            :style="{ '--color': 'var(--gray-300)' }"
                                            class="text-md"  />
                                        </UITBlockGroup>
                                    </template>
                                </UITFormAccordion>
                            </template>
                            <div class="decor-line"/>
                        </UITBlockGroup>
                        <UITBlockFlex class="gap-2.5">
                            <img src="@/assets/img/iconSocials/whatsApp.png" alt="whatsApp" class="h-6 w-6">
                            <img src="@/assets/img/iconSocials/vider.png" alt="viber" class="h-6 w-6">
                            <UITParagraphText :text="t('FOOTER.SOCIAL_NETWORK')" :color="'gray-300'" class=" px-1"/>
                        </UITBlockFlex>
                        
                        <UITButton
                        :icon-left="{ icon: 'user-outline', size: '18_18', type: 'monocolor' }"
                        :mode="'blue'"
                        :height="'h-12'"
                        :text="t('FOOTER.BUTTON_TEXT')"
                        class="w-full text-bold justify-center"/>
                        
                        <UITParagraphText :text="t('FOOTER.PAYMENT_METHODS')" :size="'lg'" :color="'white'"/>
                        
                        <UITBlockFlex class="gap-2.5">
                            <img v-for="item in card" :key="item" :src="`/img/card/${item}.png`" :alt="item" >
                        </UITBlockFlex>
                        
                        <UITParagraphText :text="t('FOOTER.FIGCAPTION')" :size="'xs'" :color="'gray-300'" />
                    </UITBlockGroup>
                
                </div>

            <!-- Desktop Footer start -->
            <div class="hidden md:block">
                <UITBlockGroup class="gap-12">
                    <UITBlockGrid class="gap-9" :container="'lg'">
                        <UITBlockGroup class="gap-5">
                            <AtomLogo/>
                            <UITButton tag="a" :mode="'link-white'" :href="`tel:${t('BASIC_INFORMATION.TELEPHONE')}`" :text="t('BASIC_INFORMATION.TELEPHONE')" />
                            <UITButton tag="a" :mode="'link-white'" :href="`mailto:${t('BASIC_INFORMATION.MAIL')}`" :text="t('BASIC_INFORMATION.MAIL')" class="text-white"/>
                            <UITParagraphText :color="'white'" :text="t('BASIC_INFORMATION.WORKING_HOURS')" class="text-white"/>
                            <UITParagraphText :text="t('BASIC_INFORMATION.ADDRESS')" :color="'gray-500'" :size="'md'" />
                        </UITBlockGroup>
                        <TemplatesFooterListLink :data="FOOTER_ROUTER[0]" />
    
                        <UITBlockGroup class="gap-6">
                            <TemplatesFooterListLink
                            v-for="(section, i) in FOOTER_ROUTER.slice(1,3)"
                            :key="i"
                            :data="section" />
    
                        </UITBlockGroup>
                        <UITBlockGroup class="gap-[30px]">
                            <UITBlockFlex class="gap-2.5">
                                <img src="@/assets/img/iconSocials/whatsApp.png" alt="whatsApp" class="h-6 w-6">
                                <img src="@/assets/img/iconSocials/vider.png" alt="viber" class="h-6 w-6">
                                <UITParagraphText :text="t('FOOTER.SOCIAL_NETWORK')" :color="'gray-300'" :size="'md'" class="px-1"/>
                            </UITBlockFlex>

                            <UITButton
                            :icon-left="{ icon: 'user-outline', size: '18_18', type: 'monocolor' }"
                            :mode="'blue'"
                            :text="t('FOOTER.BUTTON_TEXT')"
                            :height="'h-14'"
                            class="w-full px-4 text-bold justify-center md:h-12"/>

                            <UITParagraphText :text="t('FOOTER.PAYMENT_METHODS')" :size="'lg'" :color="'white'"/>

                            <UITBlockFlex class="gap-[9px] flex-wrap">
                                <img v-for="item in card" :key="item" :src="`/img/card/${item}.png`" :alt="item" >
                            </UITBlockFlex>
                        </UITBlockGroup>
                    </UITBlockGrid>
                    <UITParagraphText :text="t('FOOTER.FIGCAPTION')" :size="'xs'" :color="'gray-300'"/>
                </UITBlockGroup>
            </div>
            <!-- Desktop Footer end -->
        </div>
    </footer>
</template>

<script setup lang="ts">
import { UITBlockFlex, UITBlockGroup, UITBlockGrid, UITParagraphText, UITButton, UITFormAccordion, AtomLogo, TemplatesFooterListLink } from "#components";
import { FOOTER_ROUTER } from "@/utils/router";
import { t } from "#imports";


const card: readonly string[] = ['maestro', 'master', 'mir', 'visa']
</script>
<style lang="css" module>
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