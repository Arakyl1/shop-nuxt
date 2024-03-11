import { H3Event, EventHandlerRequest } from "h3"
import bcrypt from 'bcryptjs';
import prisma from '~/server/db'
import { _setCookie } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { Prisma } from '@prisma/client';
import { getModelName } from '@/type/intex';
import { selectProductCard } from '@/server/utils/selectData';
import { generateSessionId } from '@/server/utils/session';
import { userPersonalData, userTransform } from "~/server/utils/userTransform";
import { generateTokens, sendRefrechToken } from "~~/server/utils/jwt";


type modelName = getModelName<'RefrechToken'>
const modelName: Uncapitalize<modelName> = 'refrechToken'
type ThisMainTypeInclude = Prisma.RefrechTokenInclude

type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'user'>
const keyPropElemRelation: keyPropElemRelation[] = ['user']

const includeElemSelectParams: ThisMainTypeInclude = {
    'user': { include: { 'basket': { include: { 'item': { include: { 'card': { select: selectProductCard() } } }}} } }
}

export const authUserBase = async(event: H3Event<EventHandlerRequest>, sessionId: string | undefined) => {

    if (!sessionId) {
        const key = generateSessionId()
        _setCookie(event, 'anonim_session_id', key)
        const createData = await prisma[modelName].create({ 
            data: { 'sessionId': key, basket: { 'create': {} } }, 
            include: includeElemSelectParams
        })
        
        return { data: createData, message: null }
    } else {
        
        type IP = Prisma.StringFilter<"Anonim">
        
        const data = await prisma[modelName].findUnique({
            where: { 'sessionId': String(sessionId) },
            include: includeElemSelectParams
        })
        if (!data) {
            return { data: null, message: GET_CONTENT_KEY('AUTH_ERROR') }
        } else {
            return { data: data, message: null }
        }
       
    }
}




export  const authUser = async(event: H3Event<EventHandlerRequest>, body: any, userRefrechToken: string | undefined) => {
    
    const { username, password } = body
    const searchParams: Prisma.UserFindUniqueArgs = { where: { username: username }, include: includeElemSelectParams }
    
    const user = await prisma.user.findUnique(searchParams)
    if (!user) return ({ data: null, message: GET_CONTENT_KEY('AUTH_LOGINT_USER_IS_NOT_REGISTERED') })

    const doesThePaswordMatch = await bcrypt.compare(password, user.password)
    if (!doesThePaswordMatch) return ({ data: null, message: GET_CONTENT_KEY('AUTH_LOGINT_INVALID_PASSWORD') })

    // Find and delete old Refrech Token in DB
    if (userRefrechToken) {
        const resFindToken = await prisma[modelName].findUnique({ where: { token: userRefrechToken }, select: { id: true } })
        if (resFindToken) {
            await prisma[modelName].delete({ where: { id: resFindToken.id } })
        }
    }

   
    // Generate new access and refrech token
    const { accessToken, refrechToken } = await generateTokens(user)
    await prisma[modelName].create({ data: { 'token': refrechToken, 'userId': user.id } })
    // Set refrech token in cookie
    _setCookie(event, 'refrech_token', refrechToken)

    return { accessToken, user }
    
}
