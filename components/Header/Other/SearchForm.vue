<template>
    <div>
        <slot name="form" v-bind="{}">
            <form class="rounded-md border border-gray-300 pl-3 pr-1 py-1">
                <input type="text" placeholder="Что ищем?." class="mr-4 focus-visible:outline-none group-[.header-main]:xl:w-36">
                <ButtomStandart
                class="bg-blue-500 py-1.5 text-white xl:py-1.5"
                >Поиск</ButtomStandart>
            </form>
        </slot>
    </div>
</template>

<script setup lang="ts">
</script>