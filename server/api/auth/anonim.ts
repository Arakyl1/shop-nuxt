import prisma from '~/server/db'
import { isObject } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { Prisma } from '@prisma/client';
import { getModelName } from '@/type/intex';
import { selectProductCard, selectAnonim } from '@/server/utils/selectData';


type modelName = getModelName<'Anonim'>
const modelName: Uncapitalize<modelName> = 'anonim'
type ThisMainTypeInclude = Prisma.AnonimInclude

type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'basket'>
const keyPropElemRelation: keyPropElemRelation[] = ['basket']

const includeElemSelectParams: ThisMainTypeInclude = {
    'basket': { include: { 'item': { include: { 'card': { select: selectProductCard() } } }}}
}

export default defineEventHandler(async(event) => {

    const clientIp = getHeader(event, 'x-forwarded-for') || event.req.connection.remoteAddress
    console.log(clientIp)

    if (clientIp) {
        try {
            type IP = Prisma.StringFilter<"Anonim">
            
            const data = await prisma.anonim.findUnique({
                where: { ip: String(clientIp) },
                include: includeElemSelectParams
            })
            if (!data) {
                const createData = await prisma.anonim.create({ 
                    data: { ip: String(clientIp), basket: { 'create': {} } }, 
                    include: includeElemSelectParams
                })
                
                return { data: createData, message: null }
            } else {
                return { data: data, message: null }
            }
        } catch (error) {
            return { message: GET_CONTENT_KEY('AUTH_ERROR') }
        }
    }

})