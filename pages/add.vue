<template>
    <div>
        <form ref="form" >
            <TemplatesPageAddMain class="mb-8" @image-data="(e) => imageData = e" :create="create" />
            <TemplatesPageAddCharacteristic class="mb-8" @characteristic="(e) => characteristic = e" :create="create" />
            <TemplatesPageAddParameters class="mb-8" :create="create" />
            <div class="mb-10 text-right">
                <AtomButtonStandart @click="createItem" class="bg-blue-700 text-white ">
                    Добавить товар
                </AtomButtonStandart>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { Prisma } from '@prisma/client';
import type { unknownObj } from '~~/type/intex';
import { keyWhereValueIsNumber } from '@/utils/other'

type RequiredPropertyProductCardKey = "name" | "art" | "maker" | "categor" | "price" | "itemArt" | "itemMod"
type RequiredProperytyProductCardTyple =  ["name", "art", "maker", "categor", "price", "itemArt", "itemMod"]
type RequiredPropertyProductCard = Pick<Prisma.ProductCardUncheckedCreateInput, RequiredPropertyProductCardKey>


definePageMeta({
    title: "Добавить товар",
    middleware: ['add']
})


const form = ref<HTMLFormElement | null>(null)
const imageData = ref<Prisma.ImageCreateNestedManyWithoutProductInput | null>(null)
const characteristic = ref<Prisma.CharacteristicCreateNestedManyWithoutProductCardInput | null>(null)
const create = ref(false)
const { createAlert } = useAlert()
const { user: _user } = useStore()
const { userData } = _user()
const { create: createProduct } = useProduct()
const RequiredProperytyProductCardTyple: RequiredProperytyProductCardTyple = [
    "name", "art", "maker", "categor", "price", "itemArt", "itemMod"]

// methods 
async function createItem() {
    if (!form.value) return
    form.value.reportValidity()
    // test()
    let creatObj: unknownObj = {}
    const formData = new FormData(form.value)


    for (const [key, value] of formData) {
        if (keyWhereValueIsNumber.find(_ => _ === key)) {
            creatObj[key] = parseFloat(value as string)   
        } else if (!value) {
            test([key, value])
            return
        } else if (value === 'true') {
            creatObj[key] = true 
        } else {
            creatObj[key] = value
        }
    }

    const res = checkRequeredProperty(creatObj)
    if (!res) return

    const q =  modelProp('ProductCard', 'quantity') in creatObj ? {
        [modelProp('ProductCard','availability')]: creatObj.quantity > 0
    } : {}
    const c: { characteristic: Prisma.CharacteristicCreateNestedManyWithoutProductCardInput | undefined } | undefined = characteristic.value ? {
        [ modelProp('ProductCard', 'characteristic')]: characteristic.value
    } : undefined

    const im: { image: Prisma.ImageCreateNestedManyWithoutProductInput | undefined } | undefined = imageData.value ? {
        [modelProp('ProductCard','image')]: imageData.value
    } : undefined
    

    const sendData: Prisma.ProductCardCreateInput = { ...res, ...q, ...c, ...im }
    
    try {
        await createProduct({ data: sendData })
        test(sendData)
        // form.value.reset()
        createAlert('Товар добавлен')
    } catch (error) {
        createAlert('Произошла ощибка, повторите потытку позже')
    }
}

function checkRequeredProperty<T extends object>(obj:T): false | RequiredPropertyProductCard {
    const res = RequiredProperytyProductCardTyple.find(_ => !(_ in obj))
    return res ? false : obj as unknown as RequiredPropertyProductCard
}


watch(() => userData.value, async (newV) => {
    if (!newV) {
        await navigateTo('/')
    }
})
</script>
