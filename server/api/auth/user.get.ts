import prisma from '~/server/db'
import { userTransform } from "~/server/utils/userTransform";
import { getModelName } from '@/type/intex';
import { Prisma, Role } from '@prisma/client';
import { _createError } from "@/server/utils/message";
import { GET_SERVER_RESPONSE_KEY } from "@/server/utils/other";
import { checkValidUserId, checkValidUserRole, type checkValidUserRoleParams, type checkValidUserIdParams } from '@/server/utils/auth';


type modelName = getModelName<'User'>
const modelName: Uncapitalize<modelName> = 'user'
type ThisMainTypeInclude = Prisma.UserInclude
type ThisMainTypeSelect = Prisma.UserSelect

type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'basket'|'refrechToken'|'reviews'|'favorites'>
const keyPropElemRelation: keyPropElemRelation[] = ['basket','refrechToken','reviews','favorites']


type IncludeElemSelectParams = { [P in Role]: Prisma.UserSelect }

const mainSelectUserParams: Prisma.UserSelect = {
    'id': true,
    'role': true,
    'basket': { include: { 'item': { include: { 'card': { select: selectProductCard() } } } } },
    'favorites': { include: { item: { include: { card: { select: selectProductCard() } } } } }
}

const includeElemSelectParams: IncludeElemSelectParams = {
    'ANONIM': mainSelectUserParams,
    'ADMIN': mainSelectUserParams,
    'USER': {
        ...mainSelectUserParams,
        'email': true,
        'name': true,
        'username': true,
        'profileImage': true,
        'createAt': true,
    }
}


export default defineEventHandler(async(event) => {
    const query = getQuery(event)
    try {
        if (!checkValidUserId(query as checkValidUserIdParams[0])) throw _createError('invalid user id')
        if (!checkValidUserRole(query as checkValidUserRoleParams[0])) throw _createError('invalid user role')

        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(query.id) as number },
                select: { ...includeElemSelectParams[query.role as Role] },
            })
            return { user: userTransform(user) }
        } catch (error) {
            throw _createError(GET_SERVER_RESPONSE_KEY('AUTH_USER_WITH_THIS_ID_DOES_NOT_EXIST'))
        }
    } catch (error) {
        return error
    }
})