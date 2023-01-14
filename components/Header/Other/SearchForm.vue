<template>
    <div class="relative" >
        <slot name="form" v-bind="{ getSearch, clearDataSearch }">
            <form @submit.prevent
            class="rounded-md border border-gray-300 pl-3 pr-1 py-1 flex" >
                <input type="text"
                v-model="inputText"
                placeholder="Что ищем?."
                @keyup.enter="getSearch(inputText)"
                class="mr-4 focus-visible:outline-none group-[.header-main]:xl:w-36 grow">
                <ButtomStandart
                @click="getSearch(inputText)"
                class="bg-blue-500 py-1.5 text-white xl:py-1.5"
                >Поиск</ButtomStandart>
            </form>
        </slot>
        <div class="absolute top-[105%] left-0 w-full h-min z-30">
            <div v-show="dataSearch" >
                <Transition name="modal_search">
                <div class=" bg-white shadow-lg border rounded-md border-gray-100">
                    <div class="p-1
                    max-h-[270px] overflow-y-scroll [scrollbar-width:none] modal_search-container">
                        <ul>
                            <li v-for="item in dataSearch" :key="item.id" class="py-1">
                                <div class="flex items-center">
                                    <div class="h-7 w-7">
                                        <img :src="item.img" :alt="item.name" class="object-contain max-h-full max-w-full">
                                    </div>
                                    <NuxtLink :to="`/catalog/${item.id}`" class="grow px-2">
                                        <div>
                                            <p class="text-xs">{{ item.name }}</p>
                                            <p class="text-xs">{{ item.art }}</p>
                                        </div>
                                    </NuxtLink>
                                   <OtherTransformPrice :style="'text-xs sm:mr-0 mr-0'" :sale="item.sale" :price="item.price"
                                   class="flex-col"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="border-t border-gray-300"
                    @click="clearDataSearch">
                        <p class="text-center text-sm p-1 text-blue-500">Скрыть</p>
                    </div>
                </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const inputText = ref<string>('')
const { getProductForCategor } = useProduct()
const dataSearch = ref<any>()
const route = useRoute()
const props = defineProps<{ input?: string }>()

async function getSearch(searchText: string) {
    dataSearch.value = await getProductForCategor({
        where: {
            OR: [
                { name: { contains: searchText, mode: 'insensitive' } },
                { art: { contains: searchText, mode: 'insensitive' } },
                { categor: { contains: searchText, mode: 'insensitive' } },
                { subcategor: { contains: searchText, mode: 'insensitive' } }
            ]
        },
        take: 15,
        ...selectCardBySearch()
    })
}

function clearDataSearch() {
    dataSearch.value = null
}

watch(() => props.input ? props.input : inputText.value, (newData) => {
    if (newData) {
        getSearch(newData)
    }
})

watch(() => route.fullPath, () =>{
    clearDataSearch()
    
})
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