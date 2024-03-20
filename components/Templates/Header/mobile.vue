<template>
    <div>
        <div class="container py-4">
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
                        :icon-left="{ icon: 'static', size: '24_24' }"/>
                        <ClientOnly>
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
                        </ClientOnly>

                        <Button
                        :appearance="'gray-icon'"
                        :active="isBoolean(anonim) && !anonim"
                        :icon-left="{ icon: 'user' }"
                        @click="storeModal.changeActiveModal('auth-user')"/>
                        <Button
                        :appearance="'blue'"
                        :size="'xs'"
                        class="h-10"
                        :icon-left="{ icon: 'menu' }"
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
                        :icon="{ 'icon': 'magnifier' }"
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
    </div>
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
import { HEADER as common } from "@/common/C";



const { state, update } = localState()
const storeUser = _user()
const storeModal = _modal()
const { basketLength, anonim, favoriteLength } = storeToRefs(storeUser)
const config = useRuntimeConfig()
const className = useCssModule()

</script>

<style lang="css" module>
/* purgecss ignore */
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