<template>
  <div>
    <div class="fixed top-0 left-0 w-full bg-black-700 z-40 ap0__mask" :class="[{ active: active }]"
      @click="updateMask(false)"></div>
    <div>
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
    <Transition name="alert">
      <AtomOtherAlert />
    </Transition>
    <TemplatesModalFavorite/>
    <TemplatesModalBasket/>
    <OrganismsAuth />
    <div class="hidden md:grid-cols-1 md:gap-y-6 md:mb-6 "></div>
  </div>
</template>

<script setup lang="ts">

const { windowMask: _windowMask, windowSize: _windowSize, user: _user } = useStore()
const { updateMask, active } = _windowMask()
const { userData } = _user()
const { updateSize } = _windowSize()
const route = useRoute()
const { isDesktop, isFirefox } = useDevice();
const { initAuth } = useAuth()


onBeforeMount(async () => {
  if (!userData.value) 

  updateSize(window)
  window.addEventListener('resize', () => updateSize(window))
})

onServerPrefetch(async() => {
  await initAuth()
})

watch(() => active.value, (newValue) =>{
  if (newValue) {
    document.body.style.overflow = 'hidden'
    if (isDesktop && !isFirefox) {
      document.body.style.paddingRight = '16px'
    }
  } else {
    setTimeout(() => {  
      document.body.style.overflow = 'auto'
      if (isDesktop && !isFirefox) {
        document.body.style.paddingRight = '0'
      }
    }, 300)
  }
})

// user data
// name PPPPPPPP
// password vTyJWA5X
// email qwe3@mail.r
</script>

<style lang="css">
@import './assets/Stylesheets/main.css';

.ap0__mask {
  transition-delay: 0.22s;
  height: 0;
  opacity: 0;
}

.ap0__mask.active {
  height: 100vh;
  transition-delay: 0s;
  opacity: 0.8;
}

.path-enter-active{
  transition: all 0.3s ease-in-out;
}
.path-leave-active{
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



.alert-enter-active,
.alert-leave-active {
  transition: all 0.25s ease-out;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>