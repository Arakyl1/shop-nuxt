<template>
    <section class="mb-12 -mx-4 md:mx-0">
        <div class="flex w-full flex-wrap ">
            <div class="w-1/2 px-4 md:w-full md:px-0">
                <div v-for="item in data?.slice(0, Math.ceil(data.length/2))" :key="item.title">
                    <div class="bg-gray-100 p-8 mb-8 xl:p-6 xl:mb-6 sm:p-4 sm:mb-4">
                        <ContentRenderer  :value="item" class="delivety"/>
                    </div>
                </div>
            </div>
            <div class="w-1/2 px-4 md:w-full md:px-0">
                <div v-for="item in data?.slice(Math.ceil(data.length/2), data.length)" :key="item.title">
                    <div class="bg-gray-100 p-8 mb-8 xl:p-6 xl:mb-6 sm:p-4 sm:mb-4">
                        <ContentRenderer  :value="item" class="delivety"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="hidden lg:gap-x-6"></section>
</template>

<script setup lang="ts">

definePageMeta({
    title: "Доставка",
})

const { data } = await useAsyncData('delivery', () => queryContent('/delivery/').find())

</script>

<style lang="css">
.delivety p{
    color: #9C9C9C;
}
.delivety :is(ul, ol) > :is(span, p, a, li){
    color: #9C9C9C; 
    word-break: break-all;
}
@media screen and (max-width: 1024px) {
    .delivety :is(span, p, a, li){
        font-size: 0.875rem;
        line-height: 1.2;
    }
}

@media screen and (max-width: 768px){
    .delivety :is(span, p, a, li){
        font-size: 1rem;
    }
    .delivety h2{
        font-size: 1.875rem;
    }
    .delivety h4{
        font-size: 1.25rem;
    }
}
</style>