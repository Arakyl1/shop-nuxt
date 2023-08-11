<template>
  <div>
    <div>
      <AtomOtherAlert/>
      <OrganismsHeader class="mb-4 block md:hidden" />
      <OrganismsHeaderMobaile class="mb-4 md:block hidden"/>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-3">
      <Transition name="path" mode="out-in">
        <MoleculesOtherPath v-if="route.path !== '/'" />
      </Transition>
      <div class="min-h-screen">
        <NuxtPage ></NuxtPage>
      </div>

    </div>
    <div>
      <OrganismsFooter/>
    </div>
    <TemplatesModalFavorite/>
    <TemplatesModalBasket/>  

    <OrganismsAuth /> 
    <div class="hidden md:grid-cols-1 md:gap-y-6 md:mb-6 "></div>
  </div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";
import { Cached, CategorDataItem, Content } from "@/type/intex";


const route = useRoute()
const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)
const { initAuth } = useAuth()
const _content = useState<Content | null>('CONTENT_APP', () => null)
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP", () => null)
const headers = useRequestHeaders()

type useAuth = ReturnType<typeof useAuth>
type InitAuthResponse = Cached<useAuth['initAuth']>


onServerPrefetch(async () => {
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

  const res = await initAuth()
  if (Object.prototype.hasOwnProperty.call(headers, 'accept-language')) {
    const userLocalLanguage = getLanguageUser(headers['accept-language']!)
    const keyContent = userLocalLanguage.find(_ => _[0] !== 'en') || ['en', 0.9]
    const key = keyContent[0].toString()
    try {
      import('@/content/language/ru.js').then(res => _content.value = res.content)
    //   import(`@/content/language/${key || 'ru'}.js`).then(res => {  
    //   if (res && 'content' in res) {
    //     _content.value = res.content
    //     console.log('read content find')
    //   }
    // })
    } catch (error) {
      import('@/content/language/ru.js').then(res => _content.value = res.content)
      console.log('read content catch')
    }  
  } else {
    console.log('other Data')
    import('@/content/language/ru.js').then(res => _content.value = res.content )
    console.log('read content base')
  }
 
  await checkRes(res)
})


async function checkRes(res: InitAuthResponse) {
  if (res) {
    if ('user' in res && res.user) {
      storeUser.update(res.user)
    } else if ('messageKey' in res && res.messageKey && _content.value) {
      console.log(_content.value[res.messageKey as never])
    }
  }
}


// user data
// name PPPPPPPP
// password vTyJWA5X
// email qwe3@mail.r
</script>

<style lang="css">
@import './assets/Stylesheets/main.css';

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

/* .page-transition-enter-active {
  transition: all 0.15s ease-out;
}

.page-transition-leave-active {
  transition: all 0.15s ease-in-out;
}

.page-transition-enter-from,
.page-transition-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */
</style>