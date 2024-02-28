<template>
    <Panel :mode="'primary'">
        <Group class="gap-8 l">
            <form ref="form" class="w-full">                
                <Main 
                @image-data="(e) => imageData = e"
                :download-json-data="downloadJSONData">
                    <Flex :justify="'end'" class="gap-x-3 w-full">
                        <p class="text-gray-500 text-center ">Загрузить JSON обьект</p>
                        <Button
                        :appearance="'green'"
                        :size="'base'"
                        :rounded="'xl'"
                        :text="'Загрузить файл данных'"
                        class="h-10 text-base"
                        @click="onClick"/>
                        <input type="file" name="" id="" accept=".json" hidden ref="inputfile" @change="onChange">
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
                :size="'sm'"
                :text="'Сбросить форму'"
                class="h-12 text-md grow"
                @click="setStatus('cancel-create')"/>
                
                <Button
                :appearance="'green'"
                :size="'sm'"
                :icon-left="pending ? { key: 'loader-circles', size: '24_24' } : undefined"
                :text="'Добавить товар'"
                class="h-12 text-md grow"
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
    </Panel>
</template>
<script setup lang="ts">
import type { LoginJSONData } from '@/type/intex';
import { user as _user } from "@/stores/user";
import { alert as _alert } from "@/stores/alert";
import Panel from "@/components/UI/Panel/Panel.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Main from '@/components/Templates/page__add/Main.vue';
import Confirm from "@/components/Templates/modal/Confirm.vue";
import Alert from "@/components/Templates/modal/Alert.vue";
import Characteristic from '@/components/Templates/page__add/Characteristic.vue';
import Parameters from '@/components/Templates/page__add/Parameters.vue';
import { PAGE_META as META, CONFIRM_TITLE as commonConfirm, BASE_BUTTON as commonButton } from "@/common/C";
import { resetForm, setValueInput, searchInvalidElem } from '@/utils/formHelpers';
import { listWordsCharacteristic, listSectionsToSkip } from '@/utils/checkListWords'
import { ProductCard } from '@prisma/client';


const numberProperty = ['price', 'quantity']

definePageMeta({
    title: META.ADD.TITLE,
    // middleware: ['add']
})

const className = useCssModule()
const storeUser = _user()
const storeAlert = _alert()
const { data: userData } = storeToRefs(storeUser)
const pending = ref<boolean>(false)
const form = ref<HTMLFormElement | null>(null)
const params = ref<HTMLFormElement | null>(null)
const inputfile = ref<HTMLInputElement | null>(null)
const downloadJSONData = ref<LoginJSONData | null>(null)
const imageData = ref<{ link: string, main: boolean }[] | null>(null)
const characteristic = ref<{ title: string, children: { name: string, value: string }[] }[] | null>(null)
const { activeStatus, setStatus } = useConfirm<'cancel-create'|'check-characteristic'>()
const listSetInput = [
    'art', 'description', 'itemArt', 'itemMod','name','price','quantity','maker'
] as Array<keyof ProductCard>


const searchReg = new RegExp(`^(${listWordsCharacteristic.join('|')})$`,'i')
const listCharacteristic = computed<string | null>(() => {
    if (characteristic.value) {
        const list: string[] = []
        characteristic.value.forEach(group => {
            if (!listSectionsToSkip.includes(group.title)) {   
                group.children.forEach(_ => {
                    if (searchReg.test(_.name) && _.value.split(' ').length) {
                        list.push(_.name)
                    }
                })
            }
        })
        return list.length ? list.join(', ') : null
    }
    return null
})

onMounted(() => {
    resetData()
})

// // methods 

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

        const data: LoginJSONData = JSON.parse(target.result)
        const char = []

        if ('char' in data) { 
            for (const item of data.char) {
                const section = {
                    title: item.title,
                    data: item.data.filter(_ => _.name && _.value).map(_ => ({ name: _.name, value: _.value.replace(/\n/g, ' ') }))
                }
                if (section.title && section.data.length) {
                    char.push(section)
                }
            }
        }
        
        downloadJSONData.value = { ...data, char: char }
        
    }
}



function _setValueForm() {
    const map = new Map()
        
    for (const key in downloadJSONData.value) {
        if (Object.prototype.hasOwnProperty.call(downloadJSONData.value, key) && listSetInput.includes(key)) {
            const value = downloadJSONData.value[key];
            map.set(key, [value])
        }
    }
    form.value ? setValueInput(form!, map) : null
    params.value ? setValueInput(params!, map) : null
}


function checkValidCreateData() {
    if (form.value instanceof  HTMLFormElement) {
        switch (true) {
            case !searchInvalidElem(form):
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
    } return false
}

async function createProduct() {
    if (form.value instanceof HTMLFormElement 
        && params.value instanceof HTMLFormElement
        && !pending.value && checkValidCreateData()
    ) {
    
        
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

}


function resetData() {
    downloadJSONData.value = null
    form.value ? resetForm(form!) : null
    params.value ? resetForm(params!) : null
    nextTick(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
        const event = new CustomEvent('restore')
        window.dispatchEvent(event)
    })
}




watch(() => userData.value, async (newV) => {
    if (!newV) {
        await navigateTo('/')
    }
})

watch(() => downloadJSONData.value, (newV) => _setValueForm())
</script>

<style lang="css" module>
@media screen and (min-width: 620px) {
  .bt-control {
    width: 500px;
  }
}
</style>