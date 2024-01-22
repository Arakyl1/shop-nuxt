import prisma from '~/server/db'
import { _setCookie, isObject } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { Prisma } from '@prisma/client';
import { getModelName } from '@/type/intex';
import { selectProductCard, selectAnonim } from '@/server/utils/selectData';
import { generateSessionId } from '@/server/utils/session';


type modelName = getModelName<'Anonim'>
const modelName: Uncapitalize<modelName> = 'anonim'
type ThisMainTypeInclude = Prisma.AnonimInclude

type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'basket'>
const keyPropElemRelation: keyPropElemRelation[] = ['basket']

const includeElemSelectParams: ThisMainTypeInclude = {
    'basket': { include: { 'item': { include: { 'card': { select: selectProductCard() } } }}}
}

export default defineEventHandler(async(event) => {

    const sessionId = getCookie(event, 'anonim_session_id')
    let clientIp = null
    console.log(sessionId)


    if (!sessionId) {
        const key = generateSessionId()
        _setCookie(event, 'anonim_session_id', key)
        const createData = await prisma.anonim.create({ 
            data: { 'sessionId': key, basket: { 'create': {} } }, 
            include: includeElemSelectParams
        })
       
        
        return { data: createData, message: null }
    } else {
        
    }

    if (clientIp) {
        try {
            type IP = Prisma.StringFilter<"Anonim">
            
            const data = await prisma.anonim.findUnique({
                where: { ip: String(clientIp) },
                include: includeElemSelectParams
            })
            if (!data) {
                
            } else {
                return { data: data, message: null }
            }
        } catch (error) {
            return { message: GET_CONTENT_KEY('AUTH_ERROR') }
        }
    }

})