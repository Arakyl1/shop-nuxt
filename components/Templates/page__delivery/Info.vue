<template>
    <section class="mb-12">
        <div class="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-4 lg:gap-6 sm:gap-4">
            <div class="">
                <div v-for="item in data?.slice(0, Math.ceil(data.length / 2))" :key="item.title">
                    <div class="bg-gray-100  p-8 xl:p-6 sm:p-4   mb-8 sm:mb-4 lg:mb-6">
                        <ContentRenderer :value="item" class="delivety" />
                    </div>
                </div>
            </div>
            <div class="">
                <div v-for="item in data?.slice(Math.ceil(data.length / 2), data.length)" :key="item.title">
                    <div class="bg-gray-100  p-8 xl:p-6 sm:p-4   mb-8 sm:mb-4 lg:mb-6">
                        <ContentRenderer :value="item" class="delivety" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('delivery', () => queryContent('/delivery/').find())
</script>

<style lang="css">
.delivety p {
    color: #9C9C9C;
}

.delivety :is(ul, ol)> :is(span, p, a, li) {
    color: #9C9C9C;
    word-break: break-all;
}

@media screen and (max-width: 1024px) {
    .delivety :is(span, p, a, li) {
        font-size: 0.875rem;
        line-height: 1.2;
    }
}

@media screen and (max-width: 768px) {
    .delivety :is(span, p, a, li) {
        font-size: 1rem;
    }

    .delivety h2 {
        font-size: 1.875rem;
    }

    .delivety h4 {
        font-size: 1.25rem;
    }
}
</style>