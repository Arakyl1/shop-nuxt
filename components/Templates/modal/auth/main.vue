<template>
    <Card :container="'xl'" v-if="_userData"
    :class="className['body']"
    class="scrollbar-v1">
        <Group class="gap-y-6 w-full">
            <Flex class="gap-x-8">
                <Image :square="true"
                :src="_userData.profileImage"
                :alt="`Photo users ${_userData.username}`"
                :class="className['image']"
                :rounded="'xl'"
                class="w-12 border"/>
                <p class="text-md">{{ _userData.username }}</p>
            </Flex>

            <div class="decor-line"></div>

            <Group  class="gap-3 w-full">
                <template v-for="(elem, index) in MODAL_MENU_USER" :key="index">
                    <Group :tag="'ul'" class="gap-y-2">
                        <li v-for="item in elem" :key="item.title">
                            <Button
                            :tag="'nuxt-link'"
                            :to="item.href"
                            :mode="'link'"
                            :text="item.title"
                            :size="'sm'"/>
                        </li>
                    </Group>
                </template>
            </Group>

            <div class="decor-line"></div>
    
            <Button
            :mode="'link'"
            :size="'xl'"
            :text="common.USER_LOGOUT"
            :class="className['bt-logout']"
            @click="onClick"/>
        </Group>
    </Card>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import Image from "@/components/UI/Image/Image.vue";
import { user as _user } from "@/stores/user";
import { modal as _modal } from "@/stores/modal";
import { MODAL_MENU_USER } from '@/utils/router'
import { BASE_BUTTON as common } from '@/common/C'

const storeUser = _user()
const storeModal = _modal()
const { data: _userData, anonim } = storeToRefs(storeUser)
const { logout: _logout } = useAuth()
const className = useCssModule()


async function onClick() {
   await _logout()
    storeModal.changeActiveModal(null)
}

</script>

<style lang="css" module>
.body {
    width: 400px;
}
.image {
    border: 1px solid var(--gray-500);
}

.bt-logout {
    --color: var(--red-500);
    --color--hover: var(--red-300);
}
</style>
