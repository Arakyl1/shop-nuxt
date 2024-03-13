import type { QueryList } from "@/server/api/basket/toggle"
import { alert as _alert } from "@/stores/alert";
import { user as _user } from "@/stores/user";

export default () => {
    const storeAlert = _alert()
    const storeUser = _user()
    const { basket } = storeToRefs(storeUser)

    function handleResponse(response: FetchResponse<any> & FetchResponse<ResponseType>) {
        if (response._data.data) {
            storeUser.updateBasket(response._data.data)
        }
        if (response._data.message) {
            storeAlert.create({
                ...response._data.message
            }) 
        }
    }

    const add = async(arg: Record<keyof Pick<QueryList, 'card_id'|'count'>, string | number>) => { 
        if (!basket.value) return

        try {
            useFetch('/api/basket/toggle', {
                params: { basket_id: basket.value.id, type: 'add', card_id: arg.card_id, count: arg.count },
                onResponse({ response }) {
                    handleResponse(response)
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const remove = async(arg: Record<keyof Pick<QueryList, 'item_id'>, string | number>) => { 
        if (!basket.value) return

        try {
            useFetch('/api/basket/toggle', {
                params: { basket_id: basket.value.id, type: 'remove', item_id: arg.item_id },
                onResponse({ response }) {
                    handleResponse(response)
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    return { add, remove }
}