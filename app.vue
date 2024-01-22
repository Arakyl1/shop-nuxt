<template>
  <div>
    <div>
      <AtomOtherAlert/>
      <Header/>
      <!-- <OrganismsHeader class="mb-4 block md:hidden" />
      <OrganismsHeaderMobaile class="mb-4 md:block hidden"/> -->
    </div>
    <div class="container">
      <!-- <Transition name="path" mode="out-in">
        <MoleculesOtherPath v-if="route.path !== '/'" />
      </Transition> -->
      <div class="view">
        <NuxtPage ></NuxtPage>
      </div>
    </div>
    <div>
      
      <!-- <OrganismsFooter/> -->
    </div>
    <Footer/>
    <!-- <TemplatesModalFavorite/>
    <TemplatesModalBasket/>  

    <OrganismsAuth />  -->
    <ModalRoot/>
  </div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";
import { Cached, CategorDataItem, Content } from "@/type/intex";
import Footer from "@/components/Templates/Footer/Footer.vue";
import Header from "@/components/Templates/Header/Header.vue";
import ModalRoot from '@/components/Templates/modal/ModalRoot.vue'

const config = useRuntimeConfig()
const route = useRoute()
const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)


const _content = useState<Content | null>('CONTENT_APP', () => null)
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP", () => null)
const headers = useRequestHeaders(['cookie'])
const event = useRequestEvent()


type useAuth = ReturnType<typeof useAuth>
type InitAuthResponse = Cached<useAuth['initAuth']>
const { data: result } = await useAsyncData(async() => await fetchWithCookie('/api/auth/anonim'))


onServerPrefetch(async() => {
  
  import('@/content/language/ru.js').then(res => _content.value = res.content)
 
  useFetch('/api/attridute/get', {
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
    
  
  
  //const { initAuth } = useAuth()

  
  // await checkRes(await initAuth(headers))
  

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


async function checkRes(res: InitAuthResponse) {
  if (res) {
   
    if ('data' in res && res.data) {
      storeUser.update(res.data)
    } else if ('message' in res && res.message && _content.value) {
      console.log(res.message in _content.value ? _content.value?.[res.message as never] : res.message)
    }
  }
}



useSeoMeta({
  title: () => route.meta.title ? `${config.public.NAME_APP} - ${route.meta.title}` : config.public.NAME_APP
})
onMounted(() => console.log(document.cookie))

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
.view {
  min-height: 100vh;
}
// /* .page-transition-enter-active {
//   transition: all 0.15s ease-out;
// }

// .page-transition-leave-active {
//   transition: all 0.15s ease-in-out;
// }

// .page-transition-enter-from,
// .page-transition-leave-to {
//   transform: translateX(20px);
//   opacity: 0;
// } */
</style>