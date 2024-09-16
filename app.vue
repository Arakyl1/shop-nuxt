<template>
  <UITBlockScroll data-scroll-body class="app-body">
    <template #container>
    <!-- <UITBlockContainer :container="'sm'">
      <p>sdfsdf</p>
      <UITButton :mode="'blue'" :text="'sdfdf'" :icon-left="{ icon: 'arrow-bold', size: '28_28' }" />
      <UITAnimationLoader />
      
      <UITFormAccordion :text="'sdgsdgs'" :auto-close="false">
        <p>sdgsdgsddsgsdg</p>
        <div>
        <UITFormRadio :input-attr="{ name: 'dksjfsdf', value: '1' }" :mode="'secondary'"/>
        <UITFormRadio :input-attr="{ name: 'dksjfsdf', value: '2' }" :mode="'secondary'"/>
      </div>
      </UITFormAccordion>
      <UITFormSelect :data="[{ 'id': 1, name: '1' },{ 'id': 2, name: '2' } ,{ 'id': 3, name: '3' }]" :input-name="'test'" class="test-select" />
    </UITBlockContainer> -->
    
     <header>
      <Header class="/md:block none" />
      <!-- <HeaderMobile class="/md:hidden" /> -->
    </header>
    <main class="container mx-auto" :class="$style.page">
      <!-- <Transition name="path" mode="out-in">
        <MoleculesOtherPath v-if="route.path !== '/'" />
      </Transition>  -->
      <NuxtPage/>
    </main>
     <Footer />
    <!--<ClientOnly>
      <Alert/>
      <ModalRoot/>
    </ClientOnly>  -->
  </template>
  </UITBlockScroll>
</template>

<script setup lang="ts">
import { UITBlockScroll } from "#components";
import type { CategorDataItem } from "@/type/intex";
import Footer from "@/components/Templates/Footer/Footer.vue";
import Header from "@/components/Templates/Header/Header.vue";
// import { Button } from "#components";
// import Footer from "@/components/Templates/Footer/Footer.vue";
// import Header from "@/components/Templates/Header/Header.vue";
// import HeaderMobile from "@/components/Templates/Header/mobile.vue";
// import ModalRoot from '@/components/Templates/modal/ModalRoot.vue'
// import Alert from '@/components/Templates/Alert/Alert.vue'
// import ContentIcon from '@/components/content/Icon.vue'

const config = useRuntimeConfig()
const route = useRoute()
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP", () => null)
const { initAuth } = useAuth()

const pageTitle = computed(() => route.meta.title ? `${route.meta.title} | ${config.public.NAME_APP}` : config.public.NAME_APP)

await useFetch('/api/attridute/get', {
  server: true,
  params: { type: 'CATEGOR' },
  retry: 3,
  onResponse({ response }) {
    if (response.status < 400) {
      CATEGOR_DATA.value = response._data.filter((_: { type: string; }) => _.type === 'CATEGOR')
    }
  }
})



useHead({
  titleTemplate: () => pageTitle.value,
})

onBeforeMount(() => initAuth())
onMounted(() => console.log('App mounted'))


// user data
// name chert
// password !YBmGCx4kawQYRF
</script>

<style lang="css">
@import './assets/css/main.css';

.app-body {
  height: 100vh;
  overflow: hidden;
}
</style>

<style lang="css" module>
.page {
  min-height: 75vh;
}
</style>