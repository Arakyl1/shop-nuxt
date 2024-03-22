import { H3Event } from "h3"
import prisma from "@/server/db"
import { generateToken, decodeToken } from "@/server/utils/jwt";
import { Prisma, Role, User } from '@prisma/client';
import { _createError } from "./message";
import { CookieKey } from "@/type/intex";

export async function setNewSessionKey<T extends { id: number, role: string }>(event: H3Event, user: T, key: CookieKey = 'sessionKey') {
    const newSessionKey = generateToken({ id: user.id, role: user.role })
    try {
        await prisma.refrechToken.create({ data: { token: newSessionKey, userId: user.id } })
    } catch (error) {
        throw _createError('error white token in db')
    }
    _setCookie(event, key, newSessionKey)
}

export type checkValidUserRoleParams = Parameters<typeof checkValidUserRole>
export function checkValidUserRole(data: { [k: string]: string }) {
    return isObject(data) && ('role' in data) && Object.keys(Role).includes(data.role as string)
}

export type checkValidUserIdParams = Parameters<typeof checkValidUserId>
export function checkValidUserId(data: { [k: string]: string }) {
    return isObject(data) && ('id' in data) && ((isNumeric(data.id) || isNumber(data.id)))
}

export async function createAnonimUser(event) {
    let user = await $fetch('/api/auth/create') as unknown as User
    await setNewSessionKey(event, { id: user.id, role: user.role }, 'anonimSessionKey')
    return user
}

export function handleSessionKey(sessionKey: string) {
    const decoded = decodeToken(sessionKey,'refrech') as string | { [k: string]: string }
    if (decoded === null || isString(decoded)) throw _createError(GET_CONTENT_KEY('AUTH_UNAUTHORIZED'))
    
    if (!checkValidUserRole(decoded as checkValidUserRoleParams[0]) || !checkValidUserId(decoded as checkValidUserIdParams[0])) {
       return null
    }
    return { id: Number(decoded.id), role: decoded.role }

}


export function defineAuthenticatedEventHandler<T, K extends { [k:string]: any }>(
    handler: (event: H3Event, authUser: K) => T | Promise<T>,
    handlerReject?: (event: H3Event, error: unknown) => T | Promise<T>
) {
    return defineEventHandler(async(event) => {
        const sessionKey = getCookie(event, 'sessionKey') || ''
        try {
            const user = handleSessionKey(sessionKey)
            return handler(event, user)
        } catch (error) {
            console.log(error)
            return handlerReject ? handlerReject(event, error) : error
        }
    })
}

export async function getUser<T extends { id: number, role: string }>(user: T) {
    return await $fetch('/api/auth/user',{ params: { ...user } })
}