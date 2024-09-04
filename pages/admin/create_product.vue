<template>
    <div></div>
    <!-- <Panel :mode="'primary'">
        <Group class="gap-8 l">
            <form ref="form" class="w-full">                
                <Main 
                @image-data="(e) => imageData = e"
                :download-json-data="downloadJSONData">
                    <Flex :justify="'end'" class="gap-3 w-full">
                        <p class="text-gray-500 text-center ">{{ common.DOWNLOAD_JSON }}</p>
                        <Button
                        :appearance="'green'"
                        :text="BASE_BUTTON.DOWNLOAD_JSON"
                        class="px-4 "
                        @click="onClick"/>
                        <input type="file" name="" id="" accept=".json" hidden ref="inputFile" @change="onChange">
                    </Flex>
                </Main>
            </form>
            
            <Characteristic class="w-full"
            :download-json-data="downloadJSONData ? downloadJSONData : null"
            @characteristic="(e) => characteristic = e" />

            <form class="w-full" ref="params">
                <Parameters/>
            </form>
        </Group>
            
        <Flex :justify="'end'">
            <Flex class="gap-4 w-full flex-wrap" :class="className['bt-control']">
                <Button
                :appearance="'red'"
                :text="BASE_BUTTON.RESET_FORM"
                class="px-3 grow justify-center"
                @click="setStatus('cancel-create')"/>
                
                <Button
                :appearance="'green'"
                :icon-left="pending ? { icon: 'loader-circles', size: '24_24' } : undefined"
                :text="BASE_BUTTON.ADD_PRODUCT"
                class="px-3 grow justify-center"
                @click="createProduct"/>
            </Flex> 
        </Flex>
        <Confirm
        :title="commonConfirm.CANCEL_CREATE_PRODUCT"
        :open="activeStatus === 'cancel-create'"
        :resolve-fun="resetData"
        @close-confirm="setStatus(null)"/>
        <Alert v-if="listCharacteristic"
        :title="commonConfirm.CHECK_CHARACTERISTIC.replace('/REPLACE/',listCharacteristic)"
        :open="activeStatus === 'check-characteristic'"
        @close-confirm="setStatus(null)"/>
    </Panel> -->
</template>
<script setup lang="ts">
import type { LoginJSONData } from '@/type/intex';
import { user as _user } from "@/stores/user";
import { alert as _alert } from "@/stores/alert";
// import Panel from "@/components/UI/Panel/Panel.vue";
// import Flex from "@/components/UI/Flex/Flex.vue";
// import Group from "@/components/UI/Group/Group.vue";
// import Button from "components/UI/Button/index.vue";
// import Main from '@/components/Templates/page__admin/Main.vue';
// import Confirm from "@/components/Templates/modal/Confirm.vue";
// import Alert from "@/components/Templates/modal/Alert.vue";
// import Characteristic from '@/components/Templates/page__admin/Characteristic.vue';
// import Parameters from '@/components/Templates/page__admin/Parameters.vue';
import { t } from "#imports";
import { resetForm, setValueInput, searchInvalidElemInForm, isThisForm } from '@/utils/formHelpers';
import { listWordsCharacteristic, listSectionsToSkip } from '@/utils/checkListWords'
import { ProductCard } from '@prisma/client';


const numberProperty = ['price', 'quantity']

definePageMeta({
    title: t('PAGE_META.ADMIN__CREATE_PRODUCT.TITLE')
})

const storeUser = _user()
const storeAlert = _alert()
const { data: userData } = storeToRefs(storeUser)
const pending = ref<boolean>(false)
const form = ref<HTMLFormElement | null>(null)
const params = ref<HTMLFormElement | null>(null)
const inputFile = ref<HTMLInputElement | null>(null)
const { createAndSendEventRestore } = useForm()
const downloadJSONData = ref<LoginJSONData | null>(null)
const imageData = ref<{ link: string, main: boolean }[] | null>(null)
const characteristic = ref<{ title: string, children: { name: string, value: string }[] }[] | null>(null)
const { activeStatus, setStatus } = useConfirm<'cancel-create'|'check-characteristic'>()
const listSetInput: Array<keyof ProductCard | 'maker'> = [
    'art', 'description', 'itemArt', 'itemMod','name','price','quantity','maker'
]


const searchReg = new RegExp(`^(${listWordsCharacteristic.join('|')})$`,'i')
const listCharacteristic = computed<string | null>(() => {
    if (!characteristic.value) return null

    const list: string[] = []
    characteristic.value.forEach(group => {
        if (!listSectionsToSkip.includes(group.title)) {   
            group.children.forEach(_ => {
                if (searchReg.test(_.name) && _.value.split(' ').length) list.push(_.name)
            })
        }
    })
    return list.length ? list.join(', ') : null
})

onMounted(() => resetData())


watch(() => userData.value, async (newV) => {
    if (!newV) await navigateTo('/')
})

watch(() => downloadJSONData.value, (newV) => _setValueForm())
// // methods 

function onClick() {
    if (inputFile.value instanceof HTMLElement) inputFile.value.click()
}

function onChange({ target }: Event) {
    if (!target) return
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

async function onReaderLoad({ target }: ProgressEvent<FileReader>) {
    if (!target || !target.result || !isString(target.result)) return null

    const data: LoginJSONData = JSON.parse(target.result)
    const char = []

    if ('char' in data) {
        for (const item of data.char) {
            const section = {
                title: item.title,
                data: item.data.filter(_ => _.name && _.value).map(_ => ({ name: _.name, value: _.value.replace(/\n/g, ' ') }))
            }
            if (section.title && section.data.length) char.push(section)
        }
    }

    downloadJSONData.value = { ...data, char: char }     
}



function _setValueForm() {
    const map = new Map()
    Object.entries(downloadJSONData.value).forEach(_ => {
        const [key,value] = _
        if (listSetInput.includes(key as keyof ProductCard)) map.set(key, [value])
    })

    let forms = [form.value, params.value].forEach(_ => setValueInput(_, map))
}


function checkValidCreateData() {
    if (!isThisForm(form)) return false

    switch (true) {
        case !searchInvalidElemInForm(form):
            return false
        case !imageData.value:
            storeAlert.create({ key: 'CREATE_DOWNLOAD_PHOTO', state: 'info' })
            return false
        case !imageData.value!.find(_ => _.main === true):
            storeAlert.create({ key: 'CREATE_PRODUCT_SELECT_MAIN_PHOTO', state: 'info' })
            return false
        case !!listCharacteristic.value:
            setStatus('check-characteristic')
            return false
        default:
            return true
    }
}

async function createProduct() {
    if (!isThisForm(form) || !isThisForm(params) || pending.value || !checkValidCreateData() ) return null
    
        
    const sendData: { [key: string]: any } = {
        image: imageData.value,
        characteristic: characteristic.value
    }
    
    function setItemInSendData(form: HTMLFormElement) {
        const formData = new FormData(form)
        for (const [key, value] of formData) {
            if (numberProperty.includes(key.trim())) {
                sendData[key] = parseFloat(value as string)
            } else { sendData[key] = value }
        }
    }
    [form.value,params.value].forEach(_ => setItemInSendData(_))

    await useFetch('/api/product/create', {
        server: true, method: 'POST', body: JSON.stringify(sendData),
        onRequest() {
            pending.value = true
        },
        onResponse({ response }) {
            if (response.status < 400) {
                resetData()
                storeAlert.create({ key: 'PRODUCT_CREATE_SUCCESS', state: 'success' })
                pending.value = false
            } else {
                storeAlert.create({ key: 'CREATE_ERROR', state: 'error' })
            }
        }
    })
}


function resetData() {
    downloadJSONData.value = null
    let g = [form.value, params.value].forEach(_ => resetForm(_))
    nextTick(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
        createAndSendEventRestore()
    })
}




</script>

<style lang="css" module>
@media screen and (min-width: 620px) {
  .bt-control {
    width: 500px;
  }
}
</style>