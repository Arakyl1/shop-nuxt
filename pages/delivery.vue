<template>
    <Panel :mode="'primary'" class="mb-12">
        <Grid :container="'xs'" class="gap-8 md:gap-4 lg:gap-6 sm:gap-4" :class="className['body']">
            <Group class="gap-8">
                <Card :appearance="'gray'"
                v-for="item in data?.slice(0, Math.ceil(data.length / 2))"
                :key="item.title"
                :container="'xl'" >
                    <ContentRenderer :value="item" :class="className['delivery']" />
                </Card>
            </Group>
            <Group class="gap-8">
                <Card :appearance="'gray'"
                v-for="item in data?.slice(Math.ceil(data.length / 2), data.length)"
                :key="item.title"
                :container="'xl'" >
                    <ContentRenderer :value="item" :class="className['delivery']" />
                </Card>
            </Group>
        </Grid>
    </Panel>
</template>

<script setup lang="ts">
import Grid from "@/components/UI/Grid/Grid.vue";
import Card from "@/components/UI/Card/Card.vue";
import Group from "@/components/UI/Group/Group.vue";
import Panel from "@/components/UI/Panel/Panel.vue";
import { PAGE_META as META } from "@/common/C";

definePageMeta({
    title: META.DELIVERY.TITLE
})

const className = useCssModule()

const { data } = await useAsyncData('delivery', () => queryContent('/delivery/').find())
</script>

<style lang="scss" module>
// .body {
//     display: grid;
//     grid-template-rows: repeat(2, minmax(0, 1fr));
// }
.delivery p {
    color: #9C9C9C;
    font-size: var(--text-base);
}

.delivery :is(ul, ol)> :is(span, p, a, li) {
    color: #9C9C9C;
    word-break: break-all;
}
.delivery ol {
    list-style: none;
}

@media screen and (max-width: 1024px) {
    .delivery :is(span, p, a, li) {
        font-size: 0.875rem;
        line-height: 1.2;
    }
}

@media screen and (max-width: 768px) {
    .delivery :is(span, p, a, li) {
        font-size: 1rem;
    }

    .delivery h4 {
        font-size: 1.25rem;
    }
}
</style>

