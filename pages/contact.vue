<template>
    <Panel :mode="'primary'">
        <Title :tag="'h2'" :text="META.CONTACT.TITLE" />
        <div>
            <p class="/lg:text-lg py-4">{{ PAGE_CONTACT.HOUR_WORK }}</p>
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
import { PAGE_META as META, PAGE_CONTACT } from "@/common/C";

definePageMeta({
    title: META.CONTACT.TITLE
})

</script>
