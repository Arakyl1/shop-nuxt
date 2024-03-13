import prisma from '~/server/db'
import { userPersonalData, userTransform } from "~/server/utils/userTransform";
import { isObject } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { getModelName } from '@/type/intex';
import { Prisma } from '@prisma/client';


type modelName = getModelName<'User'>
const modelName: Uncapitalize<modelName> = 'user'
type ThisMainTypeInclude = Prisma.UserInclude
type ThisMainTypeSelect = Prisma.UserSelect

type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'basket'|'refrechToken'|'reviews'|'favorites'>
const keyPropElemRelation: keyPropElemRelation[] = ['basket','refrechToken','reviews','favorites']

const includeElemSelectParams = {
    'id': true,
    'email': true,
    'name': true,
    'username': true,
    'profileImage': true,
    'createAt': true,
    'role': true,
    'basket': { include: { 'item': { include: { 'card': { select: selectProductCard() } } } } },
    'favorites': { include: { item: { include: { card: { select: selectProductCard() } } } } }
}

type CheckValid = typeof includeElemSelectParams extends ThisMainTypeInclude ? true : false


const _Buyer = Prisma.validator<Prisma.UserArgs>()({ select: includeElemSelectParams })
export type UserBuyer = Prisma.UserGetPayload<typeof _Buyer>

export default defineEventHandler(async(event) => {
    const query = getQuery(event)
    try {
        if ('id' in query && isNumber(query.id)) return authError()
        const user = await prisma.user.findUnique({
            where: { id: Number(query.id) as number },
            select: _Buyer['select'],
        })
        if (!user) throw new Error('error')
       
        return { user }
    } catch (error) {
        return authError()
    }
})