<template>
    <header class="header">
        <div class="bg-gray-100 w-full">
            <div class="container">
                <Flex :justify="'between'" class="w-full py-2">
                    <Flex class="gap-x-4">
                        <template v-for="button,key in [HEADER_ROOTER[1], HEADER_ROOTER[2]]" :key="key">
                            <Button 
                            tag="nuxt-link"
                            :mode="'link'"
                            :text="button.title"
                            :to="button.href"
                            class="text-black-300"/>
                        </template>
                    </Flex>
                    
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
                    
                    <Flex class="gap-x-4">
                        <Button 
                        tag="nuxt-link"
                        :mode="'link'"
                        :icon-left="{ key: 'add-list', size: '30_30' }"
                        :appearance="'yellow-icon'"
                        to="/add"/>
                    
                        <Indicator :text="favoriteData.size" :active="Boolean(favoriteData.size)">
                            <ButtonLike :check-hover-parent="true" :active="Boolean(favoriteData.size)"/>
                        </Indicator>
                        <Indicator :text="basketLength" :active="Boolean(basketLength)">
                            <Button
                            :appearance="'gray-icon'"
                            :icon-left="{ key: 'basket', size: '30_30' }"
                            :check-hover-parent="true"
                            :active="Boolean(basketLength)"/>
                            
                        </Indicator>
                    </Flex>
                </Flex>
            </div>
        </div>
        <div class="container">
            <Flex :justify="'between'" class="py-4.5">
                <img src="@/assets/img/logo.png" class="h-9.5"
                :alt="`Logo market place ${config.public.NAME_APP}`">
                <Button tag="a"
                :href="`tel:${common.TELEPHONE}`"
                :mode="'none'"
                :text="common.TELEPHONE" class="text-2xl text-bold"/>
                <OrganismsSearch class="lg:mx-6" />
                <SocialIcon/>
                <Button
                :tag="'nuxt-link'"
                :appearance="'yellow'"
                :size="'lg'"
                class="h-10 text-bold"
                :text="common.BUTTON_ADDRESS_MARKER"/>
                <Button
                :appearance="'blue'"
                :size="'xs'"
                :active="isBoolean(anonim) && anonim"
                :icon-left="{ key: 'user', size: '24_24' }"/>
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
import CreateIcon from "@/content/icons/create";
import Bottom from "./Bottom.vue";
import { user as _user } from "@/stores/user";
import { favorite as _favorite } from "@/stores/favorite";
import { HEADER_ROOTER } from "#imports";
import { HEADER as common } from "@/common/C";

const storeUser = _user()
const storeFavorite = _favorite()
const { data, basketLength, anonim } = storeToRefs(storeUser)
const { data: favoriteData } = storeToRefs(storeFavorite)
const config = useRuntimeConfig()

</script>