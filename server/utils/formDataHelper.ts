import { H3Event } from "h3"
import { errorMissingParams, errorInvalidParams } from "@/server/utils/message";

export async function getFormDataInEvent(event: H3Event, modelKey: Array<string>) {
    const formBody = await readFormData(event)

    const data: { [k: string]: any } = {} 

    for (const [key,value] of formBody) {
        if (modelKey.includes(key)) {
            data[key] = value
        }
    }
    return data
}


export function checkValidFormData(formData: { [k: string]: any }, modelKey: Array<string>) {
    const formDataKey = Object.keys(formData)

    modelKey.forEach(_ => {
        if (!formDataKey.includes(_)) {
            throw errorMissingParams(_)
        }
    })

    Object.entries(formData).forEach(item => {
        if (!item[1]) {
            throw errorInvalidParams(...item)
        }
    });

    return true
}