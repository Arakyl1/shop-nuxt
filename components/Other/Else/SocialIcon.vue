<template>
    <ul class="flex">
      <li v-for="item in arrayImage"
      class="mr-2 last:mr-0"
      :key="item">
        <img
        :src="`/img/iconSocials/${item}.png`"
        :alt="item"
        />
      </li>
    </ul>
</template>

<script setup lang="ts">
const arrayImage = ['vkontakte', 'facebook', 'instagram', 'youtybe']
</script>