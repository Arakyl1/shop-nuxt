<template>
    <Flex :tag="'section'" class="text-gray-500 flex-wrap" :class="className['body']">
        <div class="">
            <Group class="gap-y-8">
                <Title :tag="'h3'" class="text-gray-500" :text="common.TITLE_COMMUNICATIONS"/>
                <Flex class="gap-8" :class="className['']">
                    <Flex class="gap-4">
                        <div :class="className['circle']" class="shadow-md">
                            <img src="@/assets/img/svg/phone.svg" alt="">
                        </div>
                        <Button :tag="'a'"
                        :mode="'link'"
                        :text="common.TELEPHONE" 
                        :href="`tel:${common.TELEPHONE}`"
                        class="text-md"/>
                        
                    </Flex>
                    <Flex class=" gap-4">
                        <div :class="className['circle']" class="shadow-md">
                            <img src="@/assets/img/svg/email.svg" alt="">
                        </div>
                        <Button :tag="'a'"
                        :mode="'link'"
                        :text="common.MAIL" 
                        :href="`mailto:${common.MAIL}`"
                        class="text-md"/>
                    </Flex>
                </Flex>
                <Title :tag="'h3'" class="text-gray-500" :text="common.TILE_SOCIAL"/>
                <SocialIcon />
            </Group>
        </div>
        <div class="grow">
            <Card :appearance="'gray'" :container="'xl'">
                <Group class="gap-y-2">
                    <Title :tag="'h3'" class="text-gray-500" :text="common.TITLE_REQUISITES"/>
                    <ContentDoc path="/contact/requisites" v-slot="{ doc }">
                        <ul class="text-black-300">
                            <Flex v-for="item in doc.body"
                            :key="item.name"
                            :tag="'li'"
                            :justify="'between'"
                            class="py-2 gap-4 text-md">
                                <p>{{ item.name }}</p>
                                <p class="text-gray-500">{{ item.value }}</p>
                            </Flex>
                        </ul>
                    </ContentDoc>
                </Group>
            </Card>
        </div>
    </Flex>
</template>

<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import Group from "@/components/UI/Group/Group.vue";
import SocialIcon from "@/components/Templates/Other/SocialIcon";
import { PAGE_CONTACT as common } from "@/common/C";

const className = useCssModule()
</script>

<style lang="css" module>
/* purgecss ignore */
.body > *:nth-child(1) {
    width: calc((100% /12) *5);
}
.circle {
    padding: 0.25rem;
    aspect-ratio: 1;
    width: 2rem;
    background-color: var(--white);
    border-radius: var(--rounded-full);
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>