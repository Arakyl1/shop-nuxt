<template>
  <div>
    <div class="fixed top-0 left-0 w-full bg-black-700 z-40 ap0__mask" :class="[{ active: active }]"
      @click="updateMask(false)"></div>
    <div>
      <WidgetsHeader v-if="isDesktopOrTablet" class="mb-4" />
      <WidgetsHeaderMobaile v-else class="mb-4" />
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-3">
      <Transition name="path">
        <EntitiesOtherPath v-if="route.path !== '/'" />
      </Transition>
      <div class="min-h-screen">
        <NuxtPage :transition="{ name: 'page-transition' }"></NuxtPage>
      </div>
    </div>
    <div>
      <WidgetsFooter v-if="isDesktopOrTablet" />
      <WidgetsFooterMobaile v-else />
    </div>
    <Transition name="alert">
      <EntitiesOtherAlert />
    </Transition>
    <WidgetsModalFavorite/>
    <WidgetsModalBasket/>
    <FeaturesUseAuth />
    <div class="hidden md:grid-cols-1 md:gap-y-6 md:mb-6"></div>
  </div>
</template>

<script setup lang="ts">
const { updateMask, active } = useWindowMask()
const { userData } = useStoreUser()
const { updateSize } = useWindowContainer()
const route = useRoute()
const { isDesktopOrTablet } = useDevice();
const { initAuth } = useAuth()

onBeforeMount(async () => {
  if (!userData.value) {
    initAuth()
  }

  updateSize(window)
  window.addEventListener('resize', () => updateSize(window))
})

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

.path-enter-active,
.path-leave-active {
  transition: all 0.3s ease-in-out;
}


.path-enter-from,
.path-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.page-transition-enter-active {
  transition: all 0.15s ease-out;
}

.page-transition-leave-active {
  transition: all 0.15s ease-in-out;
}

.page-transition-enter-from,
.page-transition-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

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