import { NOTIFICATIONS_MESSAGE, SERVER_RESPONSE_CONTENT } from "@/common/C";
import { AlertItem, AlertItemCreate } from "type/intex";

export const alert = defineStore('alert', () => {

    const data = ref<AlertItem[]>([])
    const listKey = Object.assign(NOTIFICATIONS_MESSAGE, SERVER_RESPONSE_CONTENT)

    function create(item: AlertItemCreate<keyof typeof listKey>) {
        if (item && item.key) {
            const createItem = {
                state: item.state || 'info',
                text: listKey[item.key], 
                active: true,
                createAt: Date.now()
            }
            data.value.push(createItem)
        }
    }

    function updateData() {
        if (data.value.length) {
            const valueTime = Date.now() - data.value.find((_,i,a) => i === (a.length - 1))!.createAt - 6000
            setTimeout(() => {
                const newData = data.value.slice(0, -1)
                data.value = newData
                if (newData.length) {
                    updateData()
                }
            }, Math.abs(valueTime));
        }
    }

    function removeItem(time: number) {
        const findItemIndex = data.value.findIndex(_ => _.createAt === time)
        if (findItemIndex !== -1) {
            data.value = data.value.filter((_, i) => i !== findItemIndex)
        }
    }

    watch(() => data.value.length, (newV, oldV) => {
        if (oldV === 0) {
            updateData()
        }
    })

    return { data, create, removeItem }
})
