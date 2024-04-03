import { alert as _alert } from "@/stores/alert";
import { AlertItemCreate } from "@/type/intex";

export default () => {
    const storeAlert = _alert()

    const handleResponse = (response: any, handlerOk?: (...arg: any[]) => any, handlerReject?: (...arg: any[]) => any) => {
        if (response.statusCode > 400) {
            handlerReject ? handlerReject() : createMessageError(response?.key)
        } else {
            handlerOk ? handlerOk(response) : createMessageSuccess(response?.key)
        }
    }
    
    const createMessage = (key: string, state: AlertItemCreate['state'] = 'info') => {
        storeAlert.create({ key: key as never, state: state }) 
    }

    const createMessageSuccess = (key: string) => createMessage(key, 'success')
    const createMessageError = (key: string) => createMessage(key, 'error')

    return { handleResponse, createMessage, createMessageError }
}