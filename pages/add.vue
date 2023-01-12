<template>
    <div>
        <AddProductMain class="mb-8" @main-data="(e) => mainParams = e " :create="create"/>
        <AddProductCharacteristic class="mb-8"
        @characteristic="(e) => characteristic = { characteristic: e }"
        :create="create"/>
        <AddProductParameters class="mb-8" @parameter="(e) => additionalParameter = e"
            :create="create"/>
            <div class="mb-10 text-right">
                <ButtomStandart @click="createItem"
                class="bg-blue-700 text-white">
                    Добавить товар
                </ButtomStandart>
            </div>
    </div>
</template>
<script setup lang="ts">
import useProduct from "~~/composables/useProduct";

definePageMeta({
    title: "Добавить товар",
    // pageTransition: { name: 'page-transition' }
    
})

const data = ref({})
const mainParams = ref<object>({})
const characteristic = ref<object>({})
const additionalParameter = ref<object>({})
const { addProduct } = useProduct()
const create = ref(false)

// methods 
async function createItem() {
    Object.assign(data.value, mainParams.value, additionalParameter.value)
    const result = await addProduct(JSON.stringify({main: data.value, characteristic: characteristic.value }))
    if (result) {
        create.value = !create.value
    }
}
</script>
