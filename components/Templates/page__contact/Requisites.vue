<template>
    <section>
        <div class="flex text-gray-500 flex-wrap">
            <div class="w-5/12 lg:w-full lg:mb-8">
                <div>
                    <h4 class="text-2xl text-gray-500 mb-8 xl:text-xl xl:mb-6">Для связи</h4>
                    <div class="grid grid-cols-2 mb-12 xl:mb-8 lg:flex sm:flex-wrap">
                        <div class="flex items-center lg:mr-8 sm:w-full sm:mb-4">
                            <div class="p-1 aspect-square bg-white rounded-full shadow-lg mr-4">
                                <img src="@/assets/img/svg/phone.svg" alt="">
                            </div>
                            <p class="text-lg xl:text-base">8-(495)-005-52-15</p>
                        </div>
                        <div class="flex items-center sm:w-full">
                            <div class="p-1 aspect-square bg-white rounded-full shadow-lg mr-4">
                                <img src="@/assets/img/svg/email.svg" alt="">
                            </div>
                            <a href="mailto:info@5kvt.ru" class="text-lg xl:text-base">info@5kvt.ru</a>
                        </div>
                    </div>
                    <h4 class="text-2xl text-gray-500 mb-4 xl:text-xl">Социальные сети</h4>
                    <AtomOtherSocialIcon/>
                </div>
            </div>
            <div class="w-7/12 lg:w-full">
                <div class="bg-gray-100 p-8 xl:p-6">
                    <h4 class="text-2xl text-gray-500 mb-2 xl:text-xl">Реквизиты</h4>
                    <ContentDoc path="/contact/requisites" v-slot="{ doc }">
                        <ul class="text-black-300">
                            <li v-for="item in doc.body" :key="item.name"
                            class="flex justify-between py-2 sm:flex-wrap">
                                <p class="text-lg xl:text-base sm:w-full sm:mb-1">{{ item.name }}</p>
                                <p class="text-lg text-gray-500 xl:text-base sm:w-full">{{ item.value }}</p>
                            </li>
                        </ul>
                    </ContentDoc>
                </div>
            </div>
        </div>
    </section>
</template>