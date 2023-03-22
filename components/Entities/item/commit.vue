<template>
    <div class="slader__item">
        <div>
            <div class="flex items-center py-4">
                <img :src="data.user.profileImage" :alt="data.user.username" class="w-16 rounded-full xl:w-12 md:w-10">
                <p class="text-xl text-gray-500 grow ml-4
                    xl:text-lg sm:text-base">{{ data.user.username }}</p>
                <SharedUIStar :quantity-star="data.ranting" class="justify-between group is-icon-small" />
            </div>
            <div class="py-2">
                <p class="text-black-500 text-lg sm:text-base">{{ data.text }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Commit } from "@/type/intex";

const props = defineProps<{ data: Commit }>()

</script>