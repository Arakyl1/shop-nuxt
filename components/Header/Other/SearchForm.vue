<template>
    <div class="relative">
        <slot name="form" v-bind="{ getSearch, clearDataSearch }">
            <form @submit.prevent
            class="rounded-md border border-gray-300 pl-3 pr-1 py-1" >
                <input type="text"
                v-model="inputText"
                placeholder="Что ищем?."
                @keyup.enter="getSearch(inputText)"
                @blur="clearDataSearch"
                class="mr-4 focus-visible:outline-none group-[.header-main]:xl:w-36">
                <ButtomStandart
                @click="getSearch(inputText)"
                class="bg-blue-500 py-1.5 text-white xl:py-1.5"
                >Поиск</ButtomStandart>
            </form>
        </slot>
        <Transition name="modal_search">
            <div class="absolute top-full left-0 w-full min-h-min  z-30" v-show="dataSearch">
                <div class="p-1 bg-white shadow-lg border rounded-md border-gray-100">
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
                                <div>
                                    <p class="text-xs">{{ item.price }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">

const inputText = ref<string>('')
const { searchProduct } = useProduct()
const dataSearch = ref<object | null >()
const route = useRoute()

async function getSearch(searchText: string) {
    const data =  await searchProduct({
        where: {
            OR: [
                { name: { contains: searchText, mode: 'insensitive' } },
                { art: { contains: searchText, mode: 'insensitive' } },
                { categor: { contains: searchText, mode: 'insensitive' } },
                { subcategor: { contains: searchText, mode: 'insensitive' } }
            ]
        },
        ...selectCardBySearch()
    })
    dataSearch.value = data?.value

}

function clearDataSearch() {
    dataSearch.value = null
}

watch(() => route.fullPath, () =>{
    clearDataSearch()
})
</script>

<style lang="css">

.modal_search-enter-from,
.modal_search-leave-to {
  opacity: 0;
  transition: all ease-in-out 0.3s;
}

.modal_search-enter-from,
.modal_search-leave-to{
  transform: translateY(-10px) scaleY(0);
}
</style>