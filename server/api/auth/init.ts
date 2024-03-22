import { defineAuthenticatedEventHandler, getUser } from "@/server/utils/auth"


async function handlerResponse(...arg: Parameters<Parameters<typeof defineAuthenticatedEventHandler>[0]>) {
    const [event, user] = arg
    return getUser(user!)
}

async function handlerReject(...arg: Parameters<NonNullable<Parameters<typeof defineAuthenticatedEventHandler>[1]>>) {
    const [event, error] = arg

    const anonimSessionKey = getCookie(event, 'anonimSessionKey')

    const user = anonimSessionKey ?
        handleSessionKey(anonimSessionKey) || await createAnonimUser(event) :
        await createAnonimUser(event)

    return getUser(user)
}

export default defineAuthenticatedEventHandler(handlerResponse, handlerReject) 


