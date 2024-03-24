import { defineAuthenticatedEventHandler, getUser, handlerAnonimSessionKey } from "@/server/utils/auth"
import { _getCookie } from "@/server/utils/other"

async function handlerResponse(...arg: Parameters<Parameters<typeof defineAuthenticatedEventHandler>[0]>) {
    const [event, user] = arg
    return getUser(user!)
}

async function handlerReject(...arg: Parameters<NonNullable<Parameters<typeof defineAuthenticatedEventHandler>[1]>>) {
    const [event, error] = arg
    
    try {
        const user = await handlerAnonimSessionKey(event)
        if (!(user instanceof Error)) {
            return getUser(user)
        }
        return null
    } catch (error) {
        return error
    }  
}

export default defineAuthenticatedEventHandler(handlerResponse, handlerReject) 



