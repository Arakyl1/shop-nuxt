<template>
    <div>
        <div class="container py-4">
            <UITBlockGroup class="gap-4">
                <UITBlockFlex class="w-full gap-7">
                    <UITButton
                    :tag="'nuxt-link'"
                    :to="'/'">
                        <img
                        src="@/assets/img/logo.png" class="h-8"
                        :alt="`Logo market place ${config.public.NAME_APP}`">
                    </UITButton>
                    <UITBlockFlex class="grow" :justify="'between'" :class="$style.top">
                        <UITButton
                        :mode="'gray-icon'"
                        :icon-left="{ icon: 'static', size: '24_24' }"/>
                        <ClientOnly>
                            <!-- <Indicator :text="favoriteLength" :active="!!favoriteLength">
                                <ButtonLike
                                :check-hover-parent="true"
                                :active="!!favoriteLength"
                                @click="storeModal.changeActiveModal('favorite-user')"/>
                            </Indicator>
                            <Indicator :text="basketLength" :active="!!basketLength">
                                <UITButton
                                :mode="'gray-icon'"
                                :icon-left="{ icon: 'basket', size: '30_30' }"
                                :check-hover-parent="true"
                                :active="!!basketLength"
                                @click="storeModal.changeActiveModal('basket-user')"/>
                            </Indicator> -->
                        </ClientOnly>

                        <UITButton
                        :mode="'gray-icon'"
                        :active="isBoolean(anonim) && !anonim"
                        :icon-left="{ icon: 'user' }"
                        @click="storeModal.changeActiveModal('auth-user')"/>
                        <UITButton
                        :mode="'blue'"
                        class="px-2"
                        :icon-left="{ icon: 'menu' }"
                        @click="() => update(true)"/>
                    </UITBlockFlex>
                </UITBlockFlex>
                <div class="decor-line"/>
                <UITBlockFlex class="w-full" :justify="'between'">
                    <UITBlockFlex class="gap-4">
                        <div>
                            <img src="@/assets/img/svg/phone.svg" alt="">
                        </div>
                        <UITButton
                        :tag="'a'"
                        :mode="'link'"
                        :text="common.TELEPHONE" 
                        :href="`tel:${common.TELEPHONE}`"/>
                        
                    </UITBlockFlex>
                    <UITBlockFlex class=" gap-4">
                        <div>
                            <img src="@/assets/img/svg/email.svg" alt="">
                        </div>
                        <UITButton
                        :tag="'a'"
                        :mode="'link'"
                        :text="common.MAIL" 
                        :href="`mailto:${common.MAIL}`"/>
                    </UITBlockFlex>
                </UITBlockFlex>
                <MoleculesInputSearch class="w-full" >
                    <!-- <template #form="{ refresh, onFocus }">
                        <UITFormInput
                        :mode="'secondary'"
                        :icon="{ 'icon': 'magnifier' }"
                        :style="{ '--border': 'none' }"
                        :icon-clickable="true"
                        :on-icon-click="refresh"
                        @focus.capture="onFocus"
                        @keyup.enter="refresh"/>
                    </template> -->
                </MoleculesInputSearch>
            </UITBlockGroup>
        </div>
      
        <MenuMobile :class="$style.top" :data-show-menu="state" :close-fun="update"/>
    </div>
</template>
<script setup lang="ts">
import { UITBlockFlex, UITBlockGroup, UITFormInput, UITButton } from "#components";
import { t } from "#imports";
// import Flex from "@/components/UI/Flex/Flex.vue";
// import Group from "@/components/UI/Group/Group.vue";
// import Button from "components/UI/Button/index.vue";
// import ButtonLike from "@/components/Templates/Button/ButtonLike.vue";
// import Indicator from "@/components/UI/Indicator/Indicator.vue";
// import Search from "@/components/Templates/Search/Search.vue";
// import Input from "@/components/UI/Input/Input.vue";
import MenuMobile from './Menu/Mobile.vue';
import { user as _user } from "@/stores/user";
import { modal as _modal } from "@/stores/modal";
import { HEADER as common } from "@/common/C";



const { state, update } = localState()
const storeUser = _user()
const storeModal = _modal()
const { basketLength, anonim, favoriteLength } = storeToRefs(storeUser)
const config = useRuntimeConfig()
// const className = useCssModule()

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