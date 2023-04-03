import { alertContent, type notificationOption } from "~~/pinia/alertContent";


export default (option?: notificationOption) => {
    const alert = alertContent()
    const { content, alertActive } = storeToRefs(alert)

    const createAlert = (text:string) => {
        alert.updateContent(text)
    }

    return { createAlert, content, alertActive }
}