<template>
    <div>
        <TemplatesPageAddMain class="mb-8"
        @main-data="(e) => mainParams = e"
        @image-data="(e) => imageData = e"
        :create="create" />
        <TemplatesPageAddCharacteristic class="mb-8" @characteristic="(e) => characteristic = e" :create="create" />
        <TemplatesPageAddParameters class="mb-8" @parameter="(e) => additionalParameter = e" :create="create" />
        <div class="mb-10 text-right">
            <AtomButtonStandart @click="createItem" class="bg-blue-700 text-white ">
                Добавить товар
            </AtomButtonStandart>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {
    CreateBaseProductCard,
    CharacteristicBlock,
    ProductCardParams,
    ImageInfo
} from '~~/type/intex';

definePageMeta({
    title: "Добавить товар",
    middleware: ['add']
})

const data = ref({})
const mainParams = ref<CreateBaseProductCard | null>(null)
const imageData = ref<ImageInfo[] | null>(null)
const characteristic = ref<CharacteristicBlock[] | null>(null)
const additionalParameter = ref<ProductCardParams>({})
const create = ref(false)
const { createAlert } = useAlert()
const { user: _user } = useStore()
const { userData } = _user()
const { create: createProduct } = useProduct()

// methods 
async function createItem() {
    if (!mainParams.value) {
        createAlert('Не заполены основные поля')
    }
    Object.assign(data.value, mainParams.value, additionalParameter.value)
    try {
        const sendData = Object.assign({},
            { main: data.value },
            characteristic.value ? { characteristic: characteristic.value } : {},
            imageData.value ? { image: imageData.value} : {}
        )

        await createProduct(sendData)
        // create.value = !create.value
        createAlert('Товар добавлен')
    } catch (error) {
        createAlert('Произошла ощибка, повторите потытку позже')
    }
}


watch(() => userData.value, async (newV) => {
    if (!newV) {
        await navigateTo('/')
    }
})
</script>
