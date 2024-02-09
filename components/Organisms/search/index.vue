<template>
    <div class="relative search-modul" >
        <slot name="form" v-bind="{ getSearch, updateState }">
            <form @submit.prevent
            class="rounded-md border border-gray-300 pl-3 pr-1 py-1 flex" >
                <input type="text"
                v-model="inputText"
                placeholder="Что ищем?."
                @focus.stop="updateState(true)"
                @keyup.enter="getSearch(inputText)"
                @input.stop="getSearch(inputText)"
                class="mr-4 focus-visible:outline-none group-[.header-main]:xl:w-36 grow">
                <AtomButtonStandart
                @click="getSearch(inputText)"
                
                class="bg-blue-500 py-1.5 text-white xl:py-1.5"
                >Поиск</AtomButtonStandart>
            </form>
        </slot>
        <div class="absolute top-[105%] left-0 w-full h-min z-30">
            <div v-show="state && dataSearch" >
                <Transition name="modal_search">
                <div class=" bg-white shadow-lg border rounded-md border-gray-100">
                    <div class="p-1
                    max-h-[270px] overflow-y-scroll [scrollbar-width:none] modal_search-container">
                        <ul v-if="dataSearch">
                            <template v-if="dataSearch.length">
                                <li v-for="item in dataSearch" :key="item.id" class="py-1">
                                    <div class="flex items-center">
                                        <div class="h-7 w-7">
                                            <img :src="changeValueImageSize(item.image[0].link, { 'heigth': 'h_28' })" :alt="item.name" class="object-contain max-h-full max-w-full">
                                        </div>
                                        <NuxtLink :to="`/catalog/${item.id}`" class="grow px-2">
                                            <div>
                                                <p class="text-xs">{{ item.name }}</p>
                                                <p class="text-xs">{{ item.art }}</p>
                                            </div>
                                        </NuxtLink>
                                        <!-- <AtomProductPrice :discount="item.discount" :price="item.price"
                                        class="flex-col text-sm mr-0"/> -->
                                    </div>
                                </li>
                            </template>
                            <template v-else>
                                <p class="text-xs text-gray-700">Ничего не найдено</p>
                            </template>
                        </ul>
                    </div>
                    <div class="border-t border-gray-300"
                    @click="updateState(false)">
                        <p class="text-center text-sm p-1 text-blue-500">Скрыть</p>
                    </div>
                </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ProductCardBase } from '~~/type/intex'

const props = defineProps<{ input?: string }>()
const inputText = ref<string>('')
const dataSearch = ref<ProductCardBase[]|void|null>(null)
const { state, update: updateState } = localState()
const route = useRoute()
const pending = ref<boolean>(false)


async function getSearch(searchText: string) {
    if (pending.value || searchText.length < 2) { return }
   useFetch('/api/product/get', {
        method: 'GET',
        server: true,
        params: { search: searchText, limit: 15  },
        onRequest({ response }) {
            if (!pending.value) {
                pending.value = true
            }
        },
        onResponse({ response }) {
            if ('data' in response._data) {
                dataSearch.value = response._data.data
            }
            pending.value = false
            if (searchText !== inputText.value) {   
                getSearch(inputText.value)
            }
        }
    })
}


onMounted(() => window.addEventListener('click', checkClick))
onUnmounted(() => window.removeEventListener('click', checkClick))

function checkClick({ type, target }: Event) {
    const elem = (target as HTMLElement).closest('.search-modul')
    if (dataSearch.value && !elem) {
        updateState(false)
    }
}

// watch(() => props.input ? props.input : inputText.value, (newData) => {
//     if (newData) {
//         getSearch(newData)
//     }
// })

watch(() => route.fullPath, () => updateState(false))
</script>

<style lang="css">

.modal_search-enter-from,
.modal_search-leave-to {
  opacity: 0;
    transition: all ease-in-out 0.17s;
}

.modal_search-enter-from,
.modal_search-leave-to{
  transform: translateY(-10px) scaleY(0);
}
.modal_search-container::-webkit-scrollbar {
    display: none;
}
</style>