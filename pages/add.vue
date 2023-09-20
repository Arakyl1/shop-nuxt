<template>
    <div>
        <form ref="form">
            <TemplatesPageAddMain class="mb-8" :create="create" :categor-list="CATEGOR_DATA"
                @image-data="(e) => imageData = e" :doowload-json-data="doowloadJSONData">
                <template #other-content v-if="!doowloadJSONData">
                    <div class="text-right pt-3 flex justify-end">
                        <div>
                            <AtomButtonStandart class="text-white bg-green-600 mb-1" @click="onClick">
                                Загрузить файл данных
                            </AtomButtonStandart>
                            <input type="file" name="" id="" accept=".json" hidden ref="inputfile" @change="onChange">
                            <P class="text-xs text-gray-500 text-center ">Загрузить JSON обьект</P>
                        </div>
                    </div>
                </template>
            </TemplatesPageAddMain>
            <TemplatesPageAddCharacteristic class="mb-8" :create="create"
                :doowload-json-data="doowloadJSONData ? doowloadJSONData : null"
                @characteristic="(e) => characteristic = e" />
            <TemplatesPageAddParameters class="mb-8"
                :other-params="otherData ? otherData.map(_ => ({ name: _.name, value: _.value, type: _.type })) : null"
                :doowload-json-data="doowloadJSONData ? { ...doowloadJSONData, description: doowloadJSONData.desription } : null" />
            <div class="mb-10 text-right">
                <AtomButtonStandart @click="createItem" class="bg-blue-700 text-white ">
                    Добавить товар
                </AtomButtonStandart>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { user as _user } from "@/stores/user";
import { Prisma } from "@prisma/client";
import type { CategorDataItem, Content, LoginJSONData } from '~~/type/intex';
import { alert as _alert } from "@/stores/alert";


const numberProperty = ['price', 'quantity']

definePageMeta({
    middleware: ['add']
})

const storeUser = _user()
const { data: userData } = storeToRefs(storeUser)
const form = ref<HTMLFormElement | null>(null)
const imageData = ref<{ link: string, main: boolean }[] | null>(null)
const characteristic = ref<{ title: string, children: { name: string, value: string }[] }[] | null>(null)
const create = ref(false)
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")
const otherData = ref<CategorDataItem[] | null>(null)
const doowloadJSONData = ref<LoginJSONData | null>(null)
const inputfile = ref<HTMLInputElement | null>(null)
const createActive = ref<boolean>(false)
const storeAlert = _alert()
const _content = useState<Content>('CONTENT_APP')

onMounted(() => setHeaderTitle("Добавить товар"))
onActivated(() => setHeaderTitle("Добавить товар"))

onBeforeMount(() => {
    doowloadJSONData.value = null
    create.value = !create.value
})
// // methods 

{
    await useFetch('/api/attridute/get', {
        server: false,
        method: 'GET',
        params: { type: 'OTHER' },
        key: 'attridute:OTHER',
        onResponse({ response }) {
            if (response.status < 400) {
                otherData.value = response._data.filter((_: { type: string; }) => _.type === 'OTHER')
            }
        }
    })
}


function onClick() {
    if (inputfile.value) {
        inputfile.value.click()
    }
}

function onChange({ target }: Event) {
    if (target) {
        const _target = target as HTMLInputElement
        const reader = new FileReader()
        reader.onload = onReaderLoad
        if (_target.files && _target.files.length) {
            for (const file of _target.files) {
                if (file.type === 'application/json') {
                    reader.readAsText(file)
                }
            }
        }
    }
}

async function onReaderLoad({ target }: ProgressEvent<FileReader>) {
    if (target && target.result && isString(target.result)) {
        const data = JSON.parse(target.result)
        doowloadJSONData.value = data
        console.log(data)
    }
}



async function createItem() {
    if (form.value && !createActive.value) {
        if (!form.value.reportValidity()) return
        if (!imageData.value) {
            return storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_DOOWLOAD_PHOTO || null, state: 'info' })
        } else {
            const findRes = imageData.value.find(_ => _.main === true)
            if (!findRes) {
                return storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_SELECT_MAIN_PHOTO || null, state: 'info' })
            }
        }
        createActive.value = true
        const sendData: { [key: string]: any } = {
            image: imageData.value,
            characteristic: characteristic.value
        }
        const formData = new FormData(form.value)
        for (const [key, value] of formData) {
            if (numberProperty.includes(key.trim())) {
                sendData[key] = parseFloat(value as string)
            } else { sendData[key] = value }
        }

        await useFetch('/api/product/create', {
            server: true, method: 'POST', body: JSON.stringify(sendData),
            onResponse({ response }) {
                if (response.status < 400) {
                    form.value!.reset()
                    create.value = !create.value
                    doowloadJSONData.value = null
                    storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_SUCCESS || null, state: 'success' })
                    createActive.value = false
                } else {
                    storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_ERROR || null, state: 'error' })
                }
            }
        })

    }

}


watch(() => userData.value, async (newV) => {
    if (!newV) {
        await navigateTo('/')
    }
})
</script>
