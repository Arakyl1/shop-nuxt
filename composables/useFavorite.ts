import { alert as _alert } from "@/stores/alert";
import { user as _user } from "@/stores/user";
import type { QueryListFavorite } from "@/server/api/favorite/toggle";

export default () => {
    const storeAlert = _alert()
    const storeUser = _user()
    const { favorites } = storeToRefs(storeUser)

    type Arg = Record<keyof Pick<QueryListFavorite, 'card_id'>, string | number>
    const toggle = async(arg: Arg) => { 
        if (!favorites.value) return

        try {
            useFetch('/api/favorite/toggle', {
                params: { favorite_id: favorites.value.id, card_id: arg.card_id },
                onResponse({ response }) {
                    if (response._data.data) {
                        storeUser.updateFavorite(response._data.data)
                    }
                    if (response._data.message) {
                        storeAlert.create({
                            ...response._data.message
                        }) 
                    }
                    if (response._data.type) {
                        const type = response._data.type
                        storeAlert.create({
                            key: type === 'add' ? 'ADD_PRODUCT_IN_FAVORITE' :
                                type === 'remove' ? 'REMOVE_PRODUCT_IS_FAVORITE' : '',
                            state: type === 'add' ? 'success' : 'info'
                        })
                    }
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const checkAvailabilityItemInFavorites = (card_id: number) => computed(() => !!favorites.value?.item.find(_ => _.cardId === card_id) || false).value
  
    return { toggle, checkAvailabilityItemInFavorites }
}