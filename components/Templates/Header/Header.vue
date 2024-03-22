<template>
    <div>
        <div class="bg-gray-100 w-full">
            <div class="container">
                <Flex :justify="'between'" class="w-full py-2">
                    <Flex class="gap-4">
                        <template v-for="button in [HEADER_ROUTER[0], HEADER_ROUTER[1]]" :key="button?.title">
                            <Button 
                            tag="nuxt-link"
                            :mode="'link'"
                            :text="button?.title"
                            :to="button?.href"
                            class="text-black-300"/>
                        </template>
                    </Flex>

                    <div class="none /lg:block">
                        <Flex :justify="'center'" class="grow gap-8">
                            <p class="text-gray-300">{{ common.TOP_SLOGAN }}</p>
                                <Flex class="gap-2" >
                                    <svg v-for="item in 3" :key="item"
                                    height="12" width="12px" xmlns="http://www.w3.org/2000/svg">
                                    <circle r="5" cx="6" cy="6" :style="{ 'fill': 'var(--blue-500)' }"></circle>
                                </svg>
                            </Flex>
                            <p>{{ common.TOP_CAPTION }}</p>
                        </Flex>
                    </div>
                    
                    <Flex class="gap-4">
                        <Button 
                        tag="nuxt-link"
                        :mode="'link'"
                        :icon-left="{ 'icon': 'add-list', size: '30_30' }"
                        :appearance="'yellow-icon'"
                        to="/add"/>
                    

                        <Indicator :text="favoriteLength" :active="!!favoriteLength">
                            <ButtonLike
                            :check-hover-parent="true"
                            :active="!!favoriteLength"
                            @click="storeModal.changeActiveModal('favorite-user')"/>
                        </Indicator>
                        <Indicator :text="basketLength" :active="!!basketLength">
                            <Button
                            :appearance="'gray-icon'"
                            :icon-left="{ icon: 'basket', size: '30_30' }"
                            :check-hover-parent="true"
                            :active="!!basketLength"
                            @click="storeModal.changeActiveModal('basket-user')"/>
                        </Indicator>
        
                    </Flex>
                </Flex>
            </div>
        </div>
        <div class="container">
            <Flex :justify="'between'" class="py-4.5">
                <Button
                :tag="'nuxt-link'"
                :to="'/'">
                    <img src="@/assets/img/logo.png" class="h-9.5"
                    :alt="`Logo market place ${config.public.NAME_APP}`">
                </Button>

                <Button tag="a"
                :href="`tel:${common.TELEPHONE}`"
                :mode="'none'"
                :text="common.TELEPHONE" class="text-lg text-bold"/>

                <Search class="none /lg:block" />
                
                <SocialIcon/>

                <Button
                :tag="'nuxt-link'"
                :appearance="'yellow'"
                class="text-bold px-8 none /xl:flex"
                :text="common.BUTTON_ADDRESS_MARKER"/>
                
                <Button
                :appearance="'blue'"
                class="p-1 justify-center"
                :square="true"
                :active="isBoolean(anonim) && !anonim"
                :icon-left="{ icon: 'user', size: '24_24' }"
                @click="storeModal.changeActiveModal('auth-user')"/>
            </Flex>
        </div>
        <Bottom/>
    </div>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
import ButtonLike from "@/components/Templates/Button/ButtonLike.vue";
import Indicator from "@/components/UI/Indicator/Indicator.vue";
import SocialIcon from "@/components/Templates/Other/SocialIcon";
import Search from "@/components/Templates/Search/Search.vue";
import Bottom from "./Bottom.vue";
import { user as _user } from "@/stores/user";
import { modal as _modal } from "@/stores/modal";
import { HEADER_ROUTER } from "@/utils/router";
import { HEADER as common } from "@/common/C";

const storeUser = _user()
const storeModal = _modal()
const { basketLength, anonim, favoriteLength } = storeToRefs(storeUser)
const config = useRuntimeConfig()
</script>