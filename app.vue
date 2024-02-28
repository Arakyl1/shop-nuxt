<template>
  <div>
    <div>
      <Alert/>
      <Header class="none --md:block"/>
      <HeaderMobile class="--md:hidden"/>
      <!-- <OrganismsHeader class="mb-4 block md:hidden" />
      <OrganismsHeaderMobaile class="mb-4 md:block hidden"/> -->
    </div>
    <div class="container">
      <!-- <Transition name="path" mode="out-in">
        <MoleculesOtherPath v-if="route.path !== '/'" />
      </Transition> -->
      <NuxtPage ></NuxtPage>
    </div>
    <Footer/>
    <ModalRoot/>
  </div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";
import type { Cached, CategorDataItem, Content } from "@/type/intex";
import Footer from "@/components/Templates/Footer/Footer.vue";
import Header from "@/components/Templates/Header/Header.vue";
import HeaderMobile from "@/components/Templates/Header/mobile.vue";
import ModalRoot from '@/components/Templates/modal/ModalRoot.vue'
import Alert from '@/components/Templates/Alert/Alert.vue'

const config = useRuntimeConfig()
const route = useRoute()
const storeUser = _user()
const { data: userData } = storeToRefs(storeUser)


const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP", () => null)

const event = useRequestEvent()
await useAsyncData(() => fetchWithCookie(event, '/api/auth/auth', {
    retry: 3,
    onResponse({ response }) {
      if (response._data && response._data.data && !response._data.message) {
        storeUser.update(response._data.data)
      }
    },
}))


await useFetch('/api/attridute/get', {
    server: true,
    method: 'GET',
    params: { type: 'CATEGOR' },
    key: 'attridute:CATEGOR',
    retry: 5,
    onResponse({ response }) {
        if (response.status < 400) {
          CATEGOR_DATA.value = response._data.filter((_: { type: string; }) => _.type === 'CATEGOR')
        }
    }
})

onServerPrefetch(async() => { 


  // if (Object.prototype.hasOwnProperty.call(headers, 'accept-language')) {
  //   const userLocalLanguage = getLanguageUser(headers['accept-language']!)
  //   const keyContent = userLocalLanguage.find(_ => _[0] !== 'en') || ['en', 0.9]
  //   const key = keyContent[0].toString()
  //   try {
  //     import('@/content/language/ru.js').then(res => _content.value = res.content)
  //   //   import(`@/content/language/${key || 'ru'}.js`).then(res => {  
  //   //   if (res && 'content' in res) {
  //   //     _content.value = res.content
  //   //     console.log('read content find')
  //   //   }
  //   // })
  //   } catch (error) {
  //     import('@/content/language/ru.js').then(res => _content.value = res.content)
  //     console.log('read content catch')
  //   }  
  // } else {
  //   console.log('other Data')
  //   import('@/content/language/ru.js').then(res => _content.value = res.content )
  //   console.log('read content base')
  // }
 


  
})


// async function checkRes(res: InitAuthResponse) {
//   if (res) {
   
//     if ('data' in res && res.data) {
//       storeUser.update(res.data)
//     } else if ('message' in res && res.message && _content.value) {
//       console.log(res.message in _content.value ? _content.value?.[res.message as never] : res.message)
//     }
//   }
// }



useSeoMeta({
  title: () => route.meta.title ? `${config.public.NAME_APP} - ${route.meta.title}` : config.public.NAME_APP,
})
onMounted(() => console.log('App mounted'))

// user data
// name PPPPPPPP
// password vTyJWA5X
// email qwe3@mail.r
</script>

<style lang="scss">
@use "./assets/css/main.scss";

.path-enter-active {
  transition: all 0.3s ease-in-out;
}

.path-leave-active {
  transition: all 0;
}


.path-enter-from,
.path-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

</style>