<template>
   <div>
        <div class="flex justify-between pb-6 pt-4 flex-wrap">
            <h2 class="text-3xl md:text-2xl sm:text-xl sm:w-full">Каталог товаров</h2>
            <div class="flex items-start sm:text-right sm:w-full justify-end">
                <p class="text-gray-300 mr-1 sm:text-sm">Показывать:
                    <span class="text-blue-500 ml-1 sm:text-sm">по</span>
                </p>
            <EntitiesOtherSelectingNumberDisplayedItems 
            class="p-0 px-1 focus-visible:outline-none text-blue-500 cursor-pointer sm:text-sm"/>
            </div>
        </div>
    </div>
</template>
