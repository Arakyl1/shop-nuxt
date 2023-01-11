<template>
  <div>
    <div
    class="fixed top-0 left-0 w-full bg-black-700 z-40 ap0__mask"
    :class="[{ active: store.active }]"
    @click="store.updateActive(false)"></div>
    <!-- <div >
      <HeaderMain v-if="isDesktopOrTablet"  class="mb-4"/>
      <HeaderMainMobaile v-else class="mb-4"/>
    </div> -->
    <div class="max-w-7xl mx-auto px-4 sm:px-3" >
      <Transition name="path">
        <OtherElsePath v-if="$route.path !== '/'"/>
      </Transition>
      <NuxtPage :transition="{
        name: 'page-transition',
       mode: 'in-out'
      }" >
      </NuxtPage>
    </div>
    <!-- <div>
    <Footer v-if="isDesktopOrTablet" />
    <FooterMobaile v-else/>
  </div> -->
  <Transition name="alert">
    <OtherElseAlert/>
  </Transition>
  <div class="hidden md:grid-cols-1 md:gap-y-6 md:mb-6"></div>
  </div>
</template>

<script setup lang="ts">
import { windowMask, containerSize } from "@/pinia/store";
// import { nuxtCtx } from "@nuxt/kit";
// import { storeToRefs } from "pinia";

const store = windowMask()
const containerFunc = containerSize()
// const userActiveFun = userActive()
// const { userData } = storeToRefs(userActiveFun)
// const { size } = storeToRefs(containerFunc)
const { initAuth } = useAuth()

const { isDesktopOrTablet } = useDevice();

onBeforeMount(async() => {
  initAuth()

  containerFunc.updateSize(window)
  window.addEventListener('resize', () => containerFunc.updateSize(window))
})

</script>

<style lang="css">
@import './assets/Stylesheets/main.css';
.ap0__mask{
  transition-delay: 0.22s;
  height: 0;
  opacity: 0;
}
.ap0__mask.active{
  height: 100vh;
  transition-delay: 0s;
  opacity: 0.8;
}

.path-enter-active ,
.path-leave-active {
  transition: all 0.3s ease-in-out;
}


.path-enter-from,
.path-leave-to{
  transform: translateX(30px);
  opacity: 0;
}

.page-transition-enter-active{
  transition: all 0.15s ease-out;
}

.page-transition-leave-active {
  transition: all 0.15s ease-in-out;
}

.page-transition-enter-from,
.page-transition-leave-to{
  transform: translateX(20px);
  opacity: 0;
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.25s ease-out;
}

.alert-enter-from,
.alert-leave-to{
  opacity: 0;
  transform: translateY(-20px);
}
</style>