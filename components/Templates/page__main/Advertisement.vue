<template>
    <section>
        <div class="rounded-xl hidden relative">
            <picture >
                <source srcset="/img/info/info-for-catalog-mobaile.jpg" media="(max-width: 767px)" class="w-full">
                <img src="/img/info/info-for-catalog.jpg" alt="" class="w-full">
            </picture>
            <Flex :class="className['content']"
            :direction="'column'"
            class="gap-6"
            :align="'flex-start'">
                <p class="text-white text-2xl" :class="className['text']"
                >Стабилизаторы и Источникибесперебойного питания энергии</p>
                <div class="w-16 h-0.5 bg-white"></div>
                <div>
                    <Button :appearance="'white'"
                    :text="'Перейти в каталог'"
                    class="px-10 py-4 text-base"
                    :class="className['button']"
                    :style="{ '--color': 'var(--blue-500)' }"/>
                </div>
            </Flex>
        </div>
    </section>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
import Title from "@/components/UI/Title/Title.vue";

const className = useCssModule()
</script>

<style lang="css" module>

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc((100% / 12) * 3);;
}

@media (max-width: 1024px) {
    .button {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    .text {
        font-size: var(--text-md);
    }
}
@media (max-width: 768px) {
    .content {
        width: calc((100% / 12) * 9);
        gap: 1rem;
    }
    .button {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .text {
        font-size: var(--text-2xl);
    }
}
@media (max-width: 640px) {
    .content {
        width: calc((100% / 12) * 10);
    } 
    .text {
        font-size: var(--text-lg);
    }
}

</style>