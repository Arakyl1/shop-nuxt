<template>
    <header>
        <div class="container">
            <div class="h-14"></div>
            <Group class="gap-4">
                <Flex class="w-full gap-7">
                    <Button
                    :tag="'nuxt-link'"
                    :to="'/'">
                        <img src="@/assets/img/logo.png" class="h-8"
                        :alt="`Logo market place ${config.public.NAME_APP}`">
                    </Button>
                    <Flex class="grow" :justify="'between'" :class="className['top']">
                        <Button
                        :appearance="'gray-icon'"
                        :icon-left="{ key: 'static', size: '24_24' }"/>
                        <ClientOnly>
                            <Indicator :text="4" :active="Boolean(4)">
                                <ButtonLike
                                :check-hover-parent="true"
                                :active="Boolean(44)"
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

                        <Button
                        :appearance="'gray-icon'"
                        :active="isBoolean(anonim) && !anonim"
                        :icon-left="{ key: 'user', size: '24_24' }"
                        @click="storeModal.changeActiveModal('auth-user')"/>
                        <Button
                        :appearance="'blue'"
                        :size="'xs'"
                        class="h-10"
                        :active="isBoolean(anonim) && !anonim"
                        :icon-left="{ key: 'menu', size: '24_24' }"
                        @click="() => update(true)"/>
                    </Flex>
                </Flex>
                <div class="decor-line"></div>
                <Flex class="w-full" :justify="'between'">
                    <Flex class="gap-4">
                        <div>
                            <img src="@/assets/img/svg/phone.svg" alt="">
                        </div>
                        <Button :tag="'a'"
                        :mode="'link'"
                        :text="common.TELEPHONE" 
                        :href="`tel:${common.TELEPHONE}`"/>
                        
                    </Flex>
                    <Flex class=" gap-4">
                        <div>
                            <img src="@/assets/img/svg/email.svg" alt="">
                        </div>
                        <Button :tag="'a'"
                        :mode="'link'"
                        :text="common.MAIL" 
                        :href="`mailto:${common.MAIL}`"/>
                    </Flex>
                </Flex>
                <Search class="w-full">
                    <template #form="{ refresh, onFocus }">
                        <Input :mode="'secondary'"
                        :icon="{ 'key': 'magnifier', size: '24_24' }"
                        :style="{ '--border': 'none' }"
                        :icon-clickable="true"
                        :on-icon-click="refresh"
                        @focus.capture="onFocus"
                        @keyup.enter="refresh"/>
                    </template>
                </Search>
            </Group>
        </div>
      
        <MenuMobile :class="className['menu']" :data-show-menu="state" :close-fun="update"/>
        </header>
</template>
<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import ButtonLike from "@/components/Templates/Button/ButtonLike.vue";
import Indicator from "@/components/UI/Indicator/Indicator.vue";
import Search from "@/components/Templates/Search/Search.vue";
import Input from "@/components/UI/Input/Input.vue";
import MenuMobile from './Menu/Mobile.vue';
import { user as _user } from "@/stores/user";
import { modal as _modal } from "@/stores/modal";
import { favorite as _favorite } from "@/stores/favorite";
import { HEADER as common } from "@/common/C";

// import localState from "@/utils/localState";

const { state, update } = localState()
const storeUser = _user()
const storeFavorite = _favorite()
const storeModal = _modal()
const { data, basketLength, anonim } = storeToRefs(storeUser)
// const { data: favoriteData } = storeToRefs(storeFavorite)
const config = useRuntimeConfig()
const className = useCssModule()

</script>

<style lang="css" module>
@media (min-width: 640px) {
    .top {
        gap: 1.5rem;
        justify-content: flex-end !important;
    }
}

.menu {
    transition: transform ease-in-out 0.35s;
    transform: translateX(110%);
}
.menu[data-show-menu=true] {
    transform: translateX(0);  
}

</style>