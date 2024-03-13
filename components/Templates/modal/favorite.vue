<template>
    <Group class="gap-y-6" :class="className['body']">
        <Title :tag="'h3'" :text="common.TITLE"/>
        <div class="decor-line"></div>
        <Group v-if="favoriteLength">
            <Grid :container="'md'" class="gap-8">
                <ProductCard v-for="item in favorites?.item" :key="item.cardId" :data="item.card"/>
            </Grid>
        </Group>
        <p v-else class="text-lg text-gray-700">{{ common.EMPTY_CONTENT }}</p>
    </Group>
</template>


<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import Grid from "@/components/UI/Grid/Grid.vue";
import ProductCard from '@/components/Templates/Card/Product.vue';
import { user as _user } from "@/stores/user";
import { MODAL_FAVORITE as common } from "@/common/C";


const storeUser = _user()
const { favorites, favoriteLength } = storeToRefs(storeUser)
const className = useCssModule()

</script>

<style lang="css" module>
.body {
    /* max-width: 900px; */
    width: 940px;
    aspect-ratio: 5/3;
    /* min-width: 100%; */
}
</style>