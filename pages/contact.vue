<template>
    <Panel :mode="'primary'">
        <Title :tag="'h2'" :text="'Контакты'" />
        <div>
            <p class="text-lg py-4 lg:text-base sm:text-sm">Часы работы и приёма звонков: Понедельник- суббота с 9:00 до 20:00
                ,воскресенье-выходной</p>
                <Map />
        </div>
        <Market/>
       <ClientOnly>  
            <Requisites/>
        </ClientOnly>
    </Panel>
</template>

<script setup lang="ts">
import Panel from "@/components/UI/Panel/Panel.vue";
import Title from "@/components/UI/Title/Title.vue";
import Map from "@/components/Templates/page__contact/map.vue";
import Market from "@/components/Templates/page__contact/Market.vue";
import Requisites from "@/components/Templates/page__contact/Requisites.vue";
import { PAGE_META as META } from "@/common/C";

definePageMeta({
    title: META.CONTACT.TITLE
})


</script>
