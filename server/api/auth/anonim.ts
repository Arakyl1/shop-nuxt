import prisma from "@/server/db"
import { generateToken } from "@/server/utils/jwt";
import { getModelName } from "@/type/intex";
import { Prisma } from "@prisma/client";


type modelName = getModelName<'User'>
const modelName: Uncapitalize<modelName> = 'user'
type ThisMainTypeInclude = Prisma.UserInclude

type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'basket'|'favorites'>
const keyPropElemRelation: keyPropElemRelation[] = ['basket','favorites']

const includeElemSelectParams = {
    'basket': { include: { 'item': { include: { 'card': { select: selectProductCard() } } } } },
    'favorites': { include: { item: { include: { card: { select: selectProductCard() } } } } }
}

type CheckValid = typeof includeElemSelectParams extends ThisMainTypeInclude ? true : false


const _Anonim = Prisma.validator<Prisma.UserArgs>()({ select: { id: true, role: true , ...includeElemSelectParams } })
export type UserAnonim = Prisma.UserGetPayload<typeof _Anonim>

export default defineEventHandler(async() => {
    try {
        const resCreateUser = await prisma.user.create({
            'data': { role: 'ANONIM', basket: { 'create': {} }, favorites: { create: {} } },
            select: _Anonim['select']
        })
        const token = generateToken(resCreateUser)

        await prisma.refrechToken.create({ data: { 'token': token, userId: resCreateUser.id } })
        return { user: resCreateUser, token: token }
    } catch (error) {
        
        return authError()
    }
})