<template>
    <div class="relative">
        <!-- <div class="bg-blue-500 absolute  rounded-md
        min-w-min max-h-min "
        :class="[ stage ? 'z-50' : 'z-20 delay-200']"
        @mouseenter="showModalCategor" @mouseleave="hudeModalCategor">
            <div >
            <ButtomStandart class=" text-white flex items-center h-14 relative after:z-[-1] lg:h-12"
            :class="{ 'after:content-none': stage}">
                <IconMenu class="group is-icon-white mr-3"/>
                <NuxtLink to="/catalog">
                    Каталог
                </NuxtLink>
            </ButtomStandart>

            <Transition name="categor">
                <div class="flex origin-top-left " v-show="stage" >
                    <HeaderSelect class=" px-4 " @categor="(e) => updateCategor(e)" ref="categor"/>
                    <HeaderSelectAditional v-show="listCategor.children.length"
                    :subcategor="listCategor" :style="{ 'height': heightSelectAditional + 'px'}"/>
                </div>
            </Transition>
        </div>
        </div>
        <div class="pl-36 h-14 w-full bg-gray-100 relative lg:h-12">
            <div>
                <ul class="flex flex-nowrap overflow-x-scroll scroll-smooth header__aditional" ref="list">
                    <li v-for="item in arrayLink"
                    :key="item"
                    class="p-4 lg:p-3">
                    <NuxtLink :to="{ path: '/catalog', query: { ...$route.query, categor: item } }" class="whitespace-nowrap">
                        {{ item }}
                    </NuxtLink>
                    </li>
                </ul>
                <div
                  class="w-7 h-full absolute top-0 right-0 flex items-center justify-center  bg-gradient-to-l from-white to-gray-100"
                  @click="listOffset">
                    <IconArround :class="{ 'rotate-180': !active }" class="header__aditional-icon transition-all"/>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">
// import { ShowContent } from '~~/components/Other/Modal/Show';

const listCategor = ref<{ name: string; children: [] }>({ name: '', children: [] })

// const { stage, updateStage } = ShowContent()
const heightSelectAditional = ref<number>(0)
const list = ref<HTMLElement | null>(null)
const active = ref(true)

const arrayLink = [
    "Аккумуляторы",
    "Блоки контроля",
    "Генераторы",
    "Климатическая техника",
    "Отопление",
    "Перфораторы",
    "Провода",
    "Люстры",
    "Садовая техника",
    "Инструмент"
]

function updateCategor(event: object) {
    heightSelectAditional.value = event.heigth
    listCategor.value = event.obj
}

function showModalCategor() {
    updateStage(event, true)
}

function hudeModalCategor() {
    listCategor.value = { name: '', children: [] }
    updateStage(event, false)
}

function listOffset() {
    active.value = !active.value
    const width = list.value?.scrollWidth
    
    list.value?.scrollBy(active.value ? { left: -width } : { left: width }) 
}

</script>

<style lang="css">
.categor-leave-active,
.categor-enter-active {
    transition: all 0.2s ease-in-out;
}

.categor-enter-from,
.categor-leave-to {
  opacity: 0;
}
.header__aditional{
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none
}
.header__aditional::-webkit-scrollbar{
    display: none;
}
.header__aditional-icon > path{
    fill: #7D7D7D;
}
</style>