<template>
    <div>
        <WidgetsAddMain class="mb-8" @main-data="(e) => mainParams = e " :create="create"/>
        <WidgetsAddCharacteristic class="mb-8"
        @characteristic="(e) => characteristic = { characteristic: e }"
        :create="create"/>
        <WidgetsAddParameters class="mb-8" @parameter="(e) => additionalParameter = e"
        :create="create"/>
        <div class="mb-10 text-right">
            <UIStandart @click="createItem"
            class="bg-blue-700 text-white">
                Добавить товар
            </UIStandart>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    title: "Добавить товар", 
})

const data = ref({})
const mainParams = ref<object>({})
const characteristic = ref<object>({})
const additionalParameter = ref<object>({})
const create = ref(false)
const { createAlert } = useAlert()

// methods 
async function createItem() {
    Object.assign(data.value, mainParams.value, additionalParameter.value)
    try {
        await createProduct(JSON.stringify({main: data.value, characteristic: characteristic.value }))
        create.value = !create.value
        createAlert('Товар добавлен')
    } catch (error) {
        createAlert('Произошла ощибка, повторите потытку позже')
    }
}

</script>
