<template>
     <div class="w-full">
        <template v-if="data">
            <Group class="gap-10 w-full">
                <template v-for="item in data" :key="item.id">
                    <Card>
                        <Flex class="w-full gap-6" :align="'flex-start'">
                            <Card class="bg-gray-100 py-4 px-2 rounded-xl">
                                <Image :src="item.ProductCard?.image[0].link" :class="className['image']"/>
                            </Card>
                            <Group class="gap-5">
                                <Flex>status</Flex>
                                <Group class="gap-4">
                                    <Group class="gap-3">
                                        <p>{{ item.ProductCard.name + ',   ' }}
                                            <span class="text-gray-500">{{ item.ProductCard.art }}</span>
                                        </p>
                                        <Rating :width="16" :value="item.ranting"/>
                                    </Group>
                                    <p>{{ item.text }}</p>
                                </Group>
                            </Group>
                        </Flex>
                    </Card>
                    <div class="decor-line"></div>
                </template>
            </Group>
                    <!-- <div class="flex" :class="className['status']"> -->
                        <!-- <Popover v-if="item.status === 'error'" :type="'primary'" :padding="'2xl'">
                            <template #content="{ close }">
                                <div class="relative">
                                    <Button
                                        :icon-left="Close"
                                        :icon-size="24"
                                        :square="true"
                                        :class="className['bt-close']"
                                        @click="close"/>
                                    <div class="flex" :class="className['popover-body']">
                                        <Paragraph :text="common.DECRIPTION_REASON_REJECTION" size="x" class="text-bold"/>
                                        
                                        <Paragraph text="Спам, реклама, ссылки на сторонние сайты"/>
                                    </div>
                                </div>
                            </template>
                            <TagIcon :type="item.status" :class="className['icon']"/>
                        </Popover> -->
                        <!-- <TagIcon v-else :type="item.status" :class="className['icon']"/> -->
                        <!-- <p class="text-stone-300 text-medium">{{ getTextByStatus(item.status) }}</p> -->
                    <!-- </div> -->

                    <!-- <div :class="className['item']">
                        <div :class="className['image']">
                            <Image :src="item.photo" :rounded="'base'"/>
                        </div>

                        <div :class="className['body']" class="flex">
                            <div class="flex" v-if="screen.breakpointsMin[768]" :class="className['status']">
                                <Tooltip v-if="item.status === 'error'"
                                    :label="common.DECRIPTION_REASON_REJECTION +
                                        ' Спам, реклама, ссылки на сторонние сайты'"
                                    :contentClass="className['tooltip']"
                                    :position="'bottom-left'"
                                    :type="'primary'"
                                    :padding="'sm'" >
                                    <TagIcon :type="item.status" :class="className['icon']"/>
                                </Tooltip>
                                <TagIcon v-else :type="item.status" :class="className['icon']"/>
                                <Paragraph :text="getTextByStatus(item.status)" :line="1" :size="'sm'"
                                class="text-stone-300 text-medium" />
                            </div>
                            <Paragraph :text="item.name + ', ' + item.size" :line="1" class="text-medium" />
                            <div class="flex" :class="className['rating']">
                                <Rating :readonly="true" :value="item.rating" :width="16"/>
                                <Paragraph
                                :text="modifyuDate(item.created_at)"
                                :line="1" class="text-stone-300 text-medium" />
                            </div>
                            <Paragraph v-if="screen.breakpointsMin[768] && item.text"
                                :text="item.text"
                                :line="2"/>
                            <Accordion
                                v-if="screen.breakpointsMin[768] && item.text" 
                                :text="common.DECRIPTION_DESIGNER_RESPONSE"
                                :btMode="'primary'">
                                test
                            </Accordion>
                        </div>

                    </div> -->
                    <!-- <div v-if="!screen.breakpointsMin[768]">
                        <Paragraph v-if=" item.text" :text="item.text"/>
                        <Accordion
                            v-if="item.text" 
                            :text="common.DECRIPTION_DESIGNER_RESPONSE"
                            :btMode="'primary'">
                            test
                        </Accordion>
                    </div> -->
               
            <!-- <Pagination
            v-if="cardLength"  
                :total="cardLength"
                :range-before="1"
                :range-after="2"
                :size-page="sizePage"
                :current="activePage"
                @update:current="(e) => updatePage(e, cardLength, sizePage)"
                :before-content="true"
                :afterContent="true"
                :kit-button="'set-1'"
                :container="'lg'">
            </Pagination>
            <Paragraph :text="getInfoPagination(cardLength, sizePage, common.PAGGINATION_SPAN)"
            :size="'sm'" class="text-stone-300 text-end"/> -->
        </template>

        <!-- <Placeholder v-else
        :title="commonReviews.ORDER_EMPTY_TITLE"
        :decription="commonReviews.ORDER_EMPTY_DECRIPTION"
        :bt-text="commonReviews.ORDER_EMPTY_BUTTON_TEXT"
        :img="'ask_question.png'"/> -->
    </div>
</template>

<script setup lang="ts">
import Panel from "@/components/UI/Panel/Panel.vue";
import Accordion from "@/components/UI/Accordion/Accordion.vue";
import Group from "@/components/UI/Group/Group.vue";
// import TagIcon from "@/components/UI/Tag/Icon.vue";
import Rating from "@/components/UI/Rating/Rating.vue";
import Tooltip from "@/components/UI/Tooltip/Tooltip.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Image from "@/components/UI/Image/Image.vue";
import Card from "@/components/UI/Card/Card.vue";
import Button from "@/components/UI/Button/Button.vue";
import Paragraph from "@/components/UI/Paragraph/Paragraph.vue";
import Popover from "@/components/UI/Popover/Popover.vue";
import Pagination from "@/components/UI/Pagination/Pagination.vue";

// import Placeholder from "@/components/UI/Placeholder/Placeholder.vue";
import { } from "@/common/C";

const { data } = await useFetch('/api/user/info', {
    params: { 'tag': 'reviews' },
    transform: (value) => { return value.reviews },
    server: false
})
const sizePage = ref(10)
const cardLength = ref(65)
const { activePage, updatePage, getInfoPagination } = paggination()
const className = useCssModule()

function getTextByStatus(status) {
    switch (status) {
        case 'info':
            return 'На проверке';
        case 'success':
            return 'Опубликован';
        case 'error':
            return 'Отклонен';
        default:
            break;
    }
}

// function modifyuDate(date) {
//     return `${transformDate(date, 'mode-2')} ${transformDate(date, { year: 'numeric' }, 'en-US')}, ${transformDate(date, 'mode-3')}`
// }
</script>

<style lang="css" module>

.item {
    display: flex;
    flex-wrap: nowrap;
    gap: 1.25rem;
    margin-bottom: 0.62rem;
}
.image {
    width: 70px;
}
.image > figure {
    aspect-ratio: 1/1.75;
}
.icon {
    width: 1rem;
    aspect-ratio: 1;
}
.status{
    gap: 0 0.375rem;
    margin-bottom: 1.25rem;
}
.body  {
    flex-direction: column;
    gap: 0.625rem;
}
.body > [data-accordion] {
    margin-top: 1.375rem;
}

.rating {
    gap: 0.625rem;
    flex-direction: column;
    align-items: flex-start;
}
.tooltip {
    max-width: 15.5rem;
    width: max-content;
}
.bt-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
}
.popover-body {
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 1rem;
}
@media (min-width: 768px) {
    .body {
        display: block;
    }
    .item {
        margin-bottom: 0;
    }
    .body > *:nth-child(2) {
        margin-bottom: 0.625rem;
    }
    .body > *:nth-child(3) {
        margin-bottom: 1rem;
    }
    .rating {
        gap: 0.875rem;
        flex-direction: row;
        align-items: center;
    }
}
</style>