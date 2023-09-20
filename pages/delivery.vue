<template>
    <div>   
        <TemplatesPageDeliveryInfo/>
        <section class="hidden lg:gap-x-6"></section>
    </div>
</template>

<script setup lang="ts">


onMounted(() => setHeaderTitle("Доставка"))
onActivated(() => setHeaderTitle('Главная страница'))

</script>

