<template>
    <div>
        <header>
            <Header class="/md:block none" />
            <HeaderMobile class="/md:hidden" />
        </header>
        <main class="container">
            <Panel :mode="'primary'">
                <Flex :justify="'center'">
                    <Button
                    :appearance="'green'"
                    :text="common.PAGE_ERROR_BUTTON"
                    class="px-5 justify-center"
                    @click="handleError" />
                </Flex>
            </Panel>
        </main>
        <Footer />
        <ClientOnly>
            <Alert />
            <ModalRoot />
        </ClientOnly>
        <ContentIcon hidden="true" class="none" />
    </div>
</template>

<script setup lang="ts">
import type { CategorDataItem } from "@/type/intex";
import Footer from "@/components/Templates/Footer/Footer.vue";
import Header from "@/components/Templates/Header/Header.vue";
import HeaderMobile from "@/components/Templates/Header/mobile.vue";
import ModalRoot from '@/components/Templates/modal/ModalRoot.vue'
import Alert from '@/components/Templates/Alert/Alert.vue'
import ContentIcon from '@/components/content/Icon.vue'
import Panel from '@/components/UI/Panel/Panel.vue';
import Flex from '@/components/UI/Flex/Flex.vue';
import Button from '@/components/UI/Button/Button.vue';
import { BASE_BUTTON as common, PAGE_META } from '@/common/C'
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
const config = useRuntimeConfig()
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP", () => null)

await useFetch('/api/attridute/get', {
    server: true,
    method: 'GET',
    params: { type: 'CATEGOR' },
    retry: 3,
    onResponse({ response }) {
        if (response.status < 400) {
            CATEGOR_DATA.value = response._data.filter((_: { type: string; }) => _.type === 'CATEGOR')
        }
    }
})


useHead({
    titleTemplate: () => `${PAGE_META.ERROR.TITLE} | ${config.public.NAME_APP}`
})

</script>

<style lang="scss">
@use "@/assets/css/main.scss" ;
</style>