<template>
    <div>
        <div class="bg-gray-100 w-full">
            <div class="container mx-auto">
                <UITBlockFlex :justify="'between'" class="w-full py-2">
                    <UITBlockFlex class="gap-4" :width-full="false">
                        <template v-for="button in [HEADER_ROUTER[0], HEADER_ROUTER[1]]" :key="button?.title">
                            <UITButton 
                            tag="nuxt-link"
                            :mode="'link'"
                            :text="button?.title"
                            :to="button?.href"
                            class="text-black-300"/>
                        </template>
                    </UITBlockFlex>

                    <div class="none /lg:block">
                        <UITBlockFlex :justify="'center'" class="grow gap-8">
                            <UITParagraphText :color="'gray-300'" class="text-nowrap" :text="t('HEADER.TOP_SLOGAN')"/>
                        
                                <UITBlockFlex class="gap-2" >
                                    <UITGeometryCircle v-for="item in 3" :key="item" class="h-2 w-2 bg-blue-500"/>
                            </UITBlockFlex>
                            <UITParagraphText class="text-nowrap" :text="t('HEADER.TOP_CAPTION')"/>
                        </UITBlockFlex>
                    </div>
                    
                    <UITBlockFlex class="gap-4" :width-full="false">
                        <UITButton 
                        tag="nuxt-link"
                        :icon-left="{ 'icon': 'add-list', size: '30_30', type: 'monocolor' }"
                        :mode="'yellow-icon'"
                        :to="ROOTER.admin.href"/>
                    

                        <!-- <Indicator :text="favoriteLength" :active="!!favoriteLength">
                            <ButtonLike
                            :check-hover-parent="true"
                            :active="!!favoriteLength"
                            @click="storeModal.changeActiveModal('favorite-user')"/>
                        </Indicator>
                        <Indicator :text="basketLength" :active="!!basketLength">
                            
                        </Indicator> -->

                        <UITButton
                            :mode="'gray-icon'"
                            :icon-left="{ icon: 'basket', size: '30_30' }"
                            :check-hover-parent="true"
                            :active="!!basketLength"
                            @click="storeModal.changeActiveModal('basket-user')"/>
        
                    </UITBlockFlex>
                </UITBlockFlex>
            </div>
        </div>
        <div class="container mx-auto">
            <UITBlockFlex :justify="'between'" class="py-4">
                <UITButton
                :tag="'nuxt-link'"
                :to="'/'">
                    <AtomLogo class="h-9.5"/>
                </UITButton>

                <UITButton
                tag="a"
                :href="`tel:${t('BASIC_INFORMATION.TELEPHONE')}`"
                :mode="'none'"
                :text="t('BASIC_INFORMATION.TELEPHONE')" class="text-xl text-bold"/>

                <!-- <Search class="none /lg:block" />-->
                
                <AtomOtherSocialIcon/> 

                <UITButton
                :tag="'nuxt-link'"
                :mode="'yellow'"
                :height="'h-10'"
                class="text-bold px-8 hidden lg:flex"
                :text="t('BASE_BUTTON.ADDRESS_MARKER')"/>
                
                <UITButton
                :mode="'blue'"
                :square="true"
                :height="'h-10'"
                :active="isBoolean(anonim) && !anonim"
                :icon-left="{ icon: 'user', size: '24_24', type: 'monocolor' }"
                class="p-1 justify-center"
                @click="storeModal.changeActiveModal('auth-user')"/>
            </UITBlockFlex>
        </div>
        <Bottom/>
    </div>
</template>

<script setup lang="ts">
import { UITBlockFlex, UITButton, UITParagraphText, UITGeometryCircle } from "#components";
import { t } from "#imports";
// import Flex from "@/components/UI/Flex/Flex.vue";
// import Button from "components/UI/Button/index.vue";
// import ButtonLike from "@/components/Templates/Button/ButtonLike.vue";
// import Indicator from "@/components/UI/Indicator/Indicator.vue";
// import SocialIcon from "@/components/Templates/Other/SocialIcon";
// import Search from "@/components/Templates/Search/Search.vue";
import Bottom from "./Bottom.vue";
import { user as _user } from "@/stores/user";
import { modal as _modal } from "@/stores/modal";
import { HEADER_ROUTER, ROOTER } from "@/utils/router";
// import { HEADER as common } from "@/common/C";

const storeUser = _user()
const storeModal = _modal()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { basketLength, anonim, favoriteLength } = storeToRefs(storeUser)
</script>