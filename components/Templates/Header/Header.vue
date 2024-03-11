<template>
    <header>
        <div class="bg-gray-100 w-full">
            <div class="container">
                <Flex :justify="'between'" class="w-full py-2">
                    <Flex class="gap-x-4">
                        <template v-for="button,key in [HEADER_ROUTER[1], HEADER_ROUTER[2]]" :key="key">
                            <Button 
                            tag="nuxt-link"
                            :mode="'link'"
                            :text="button.title"
                            :to="button.href"
                            class="text-black-300"/>
                        </template>
                    </Flex>

                    <div class="none --lg:block">
                        <Flex :justify="'center'" class="grow gap-x-8">
                            <p class="text-gray-300">Построй и обустрой</p>
                                <Flex class="gap-x-2" >
                                    <svg v-for="item in 3" :key="item"
                                    height="12" width="12px" xmlns="http://www.w3.org/2000/svg">
                                    <circle r="5" cx="6" cy="6" class="fill-blue-500"></circle>
                                </svg>
                            </Flex>
                            <p>Всё для дома, дачи и стройки!</p>
                        </Flex>
                    </div>
                    
                    <Flex class="gap-x-4">
                        <Button 
                        tag="nuxt-link"
                        :mode="'link'"
                        :icon-left="{ key: 'add-list', size: '30_30' }"
                        :appearance="'yellow-icon'"
                        to="/add"/>
                    <ClientOnly>

                        <Indicator :text="4" :active="Boolean(4)">
                            <ButtonLike
                            :check-hover-parent="true"
                            :active="Boolean(4)"
                            @click="storeModal.changeActiveModal('favorite-user')"/>
                        </Indicator>
                        <Indicator :text="basketLength" :active="Boolean(basketLength)">
                            <Button
                            :appearance="'gray-icon'"
                            :icon-left="{ key: 'basket', size: '30_30' }"
                            :check-hover-parent="true"
                            :active="Boolean(basketLength)"
                            @click="storeModal.changeActiveModal('basket-user')"/>
                        </Indicator>
                    </ClientOnly>
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

                <Search class="none --lg:block" />
                
                <SocialIcon/>

                <Button
                :tag="'nuxt-link'"
                :appearance="'yellow'"
                :size="'lg'"
                class="h-10 text-bold --md:hidden"
                :text="common.BUTTON_ADDRESS_MARKER"/>
                
                <Button
                :appearance="'blue'"
                :size="'xs'"
                class="h-10"
                :active="isBoolean(anonim) && !anonim"
                :icon-left="{ key: 'user', size: '24_24' }"
                @click="storeModal.changeActiveModal('auth-user')"/>
            </Flex>
        </div>
        <Bottom/>
    </header>
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
import { favorite as _favorite } from "@/stores/favorite";
import { HEADER_ROUTER } from "#imports";
import { HEADER as common } from "@/common/C";

const storeUser = _user()
const storeFavorite = _favorite()
const storeModal = _modal()
const { data, basketLength, anonim } = storeToRefs(storeUser)
const { data: favoriteData } = storeToRefs(storeFavorite)
const config = useRuntimeConfig()

</script>