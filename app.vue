<template>
  <div>
    <header>
      <Header class="/md:block none" />
      <HeaderMobile class="/md:hidden" />
    </header>
    <main class="container">
      <!-- <Transition name="path" mode="out-in">
        <MoleculesOtherPath v-if="route.path !== '/'" />
      </Transition> -->
      <NuxtPage/>
    </main>
    <Footer />
    <ClientOnly>
      <Alert/>
      <ModalRoot/>
    </ClientOnly>
    <ContentIcon hidden="true" class="none"/>
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
// name PPPPPPPP
// password vTyJWA5X
// email qwe3@mail.r
</script>

<style lang="scss" >
@use "@/assets/css/main.scss" ;

// .path-enter-active {
//   transition: all 0.3s ease-in-out;
// }

// .path-leave-active {
//   transition: all 0;
// }


// .path-enter-from,
// .path-leave-to {
//   transform: translateX(30px);
//   opacity: 0;
// }
</style>
