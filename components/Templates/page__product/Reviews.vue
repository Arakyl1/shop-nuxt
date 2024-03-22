<template>
    <Card :appearance="'gray'" :container="'xl'">
        <CardGridScroll :data="reviewsUpdate" :container="'xs'">
            <template #header="{ prev, next, listValueScroll }">
                <Flex :direction="'column'" :align="'flex-start'" class="gap-6 ">
                    <Flex class="gap-4 w-full">
                        <Title :tag="'h3'"
                        :text="common.TEXT_REVIEWS"
                        class="text-black-100 grow" />
                        <Flex class="gap-2">
                            <ButtonArrow
                            :disabled="listValueScroll.current === 0"
                            @click="prev"
                            :height="'h-10'"
                            class="-scale-100"/>
                            <ButtonArrow
                            :disabled="listValueScroll.current >= listValueScroll.max"
                            @click="next"
                            :height="'h-10'"/>
                        </Flex>
                    </Flex>
                    <div class="decor-line"></div>
                </Flex>
            </template>
            <template #default="{ elem }">
                <Commit :data="elem" v-if="elem" />
            </template>
            <template #footer>
                <p v-if="!reviewsUpdate.length"
                class="text-md text-gray-500 py-4"
                >{{ common.TEXT_NOT_REVIEWS }}</p>
                <Flex :align="'flex-end'" :direction="'column'" class="gap-4">
                    <div></div>
                    <div>
                        <Button v-if="!anonim"
                        :appearance="'yellow'"
                        :text="commonButton.REVIEWS_ADD"
                        @click="openModalCreateReviews"
                        :height="'h-8'"
                        class="px-4" />
                    </div>
                </Flex>
            </template>
        </CardGridScroll>
    </Card>
</template>
<script setup lang="ts">
import type { ProductCardFull } from '~~/type/intex';
import { PAGE_CATALOG_ID as common, BASE_BUTTON as commonButton } from "@/common/C";
import { user as _user } from "@/stores/user";
import { modal as _modal } from "@/stores/modal";
import { createReviews as _createReviews } from "@/stores/createReviews";
import ButtonArrow from '@/components/Templates/Button/ButtonArrow.vue'
import Commit from '@/components/Templates/Card/Commit.vue'
import Button from "@/components/UI/Button/Button.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import Card from "@/components/UI/Card/Card.vue";

interface Props {
    data: ProductCardFull
}

const props = defineProps<Props>()
const storeUser = _user()
const storeModal = _modal()
const storeCreateReviews = _createReviews()
const { data: _userData, anonim } = storeToRefs(storeUser)

const reviewsUpdate = computed(() => props.data.reviews.filter(el => el.text))

function openModalCreateReviews() {
    storeCreateReviews.updateData({ id: props.data.id, name: props.data.name, art: props.data.art })
    storeModal.changeActiveModal('add-reviews-user')
}
</script>

