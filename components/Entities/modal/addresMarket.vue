<template>
    <div>
        <div class="flex justify-between bg-gray-100 py-3 px-5 rounded-md">
            <p class="text-gray-300">Адрес</p>
            <p class="text-gray-300">Режим работы</p>
        </div>
        <ContentDoc :path="'/contact/market'" v-slot="{ doc }">
            <ul v-for="item in doc.body" :key="item.adress">
                <li class="flex px-5 py-3 border-b border-gray-300 xl:px-2">
                    <p class="grow pr-12">{{ item.adress }}</p>
                    <div class="text-right">
                        <p class="whitespace-nowrap">
                            <span class="text-blue-500">Понедельник</span>
                            - суббота с
                            <span class="text-gray-300">{{ item.working_hours_from }}</span>
                            до
                            <span class="text-gray-300">{{ item.working_hours_to }}</span>
                        </p>
                        <p class="whitespace-nowrap">
                            <span class="text-yellow-500">Воскресенье</span>
                            <span class="text-gray-300">{{ item.weekend }}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </ContentDoc>
    </div>
</template>
