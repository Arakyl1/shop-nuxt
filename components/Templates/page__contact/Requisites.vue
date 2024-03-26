<template>
    <Flex :tag="'section'" class="text-gray-500 flex-wrap gap-4" :class="className['body']">
        <Group class="gap-8">
                <Title :tag="'h3'" class="text-gray-500" :text="common.TITLE_COMMUNICATIONS"/>
                <Grid class="gap-8 w-full" :container="'xs'">
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
                </Grid>
                <Title :tag="'h3'" class="text-gray-500" :text="common.TILE_SOCIAL"/>
                <SocialIcon />
            </Group>
        <div class="grow">
            <Card :appearance="'gray'" :container="'xl'">
                <Group class="gap-2 w-full">
                    <Title :tag="'h3'" class="text-gray-500" :text="common.TITLE_REQUISITES"/>
                    <ContentDoc path="/contact/requisites" v-slot="{ doc }">
                        <Group :tag="'ul'" class="text-black-300 gap-4 w-full">
                            <Grid :tag="'li'"
                            :container="'xs'"
                            v-for="item in doc.body"
                            :key="item.name"
                            :justify="'start'"
                            class="w-full gap-4 /lg:text-md">
                                <p class="w-full ">{{ item.name }}</p>
                                <p class="text-gray-500">{{ item.value }}</p>
                            </Grid>
                        </Group>
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
import Grid from "@/components/UI/Grid/Grid.vue";
import Group from "@/components/UI/Group/Group.vue";
import SocialIcon from "@/components/Templates/Other/SocialIcon";
import { PAGE_CONTACT as common } from "@/common/C";

const className = useCssModule()
</script>

<style lang="css" module>
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