<template>
<li class="mb-5 cursor-pointer"> 
    <div class="flex">
        <ButtomStandart class="bg-black-500 mr-3 rounded p-1"
        @click="active = !active">
            <IconAdd class="group is-icon-white"/>
        </ButtomStandart>
        <p class="text-white grow">{{ item.name }}</p>
    </div>
    <div>
        <ul v-show="active" class="pl-8 pt-3">
            <li v-for="elem in item.children" :key="elem.name"
            class="mb-2 text-white last:mb-0">
                {{ elem.name }}
            </li>
        </ul>
    </div>
</li>



</template>
<script setup lang="ts">
defineProps<{ item: object }>()

const active = ref<boolean>(false)
</script>