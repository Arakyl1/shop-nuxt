import prisma from '~/server/db'
import { _setCookie } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { Prisma } from '@prisma/client';
import { getModelName } from '@/type/intex';
import { selectProductCard } from '@/server/utils/selectData';
import { generateSessionId } from '@/server/utils/session';


type modelName = getModelName<'Anonim'>
const modelName: Uncapitalize<modelName> = 'anonim'
type ThisMainTypeInclude = Prisma.AnonimInclude

type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'basket'>
const keyPropElemRelation: keyPropElemRelation[] = ['basket']

const includeElemSelectParams: ThisMainTypeInclude = {
    'basket': { include: { 'item': { include: { 'card': { select: selectProductCard() } } }}}
}

export const authUserAnonim = async(event: H3Event<EventHandlerRequest>, sessionId: string | undefined) => {

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