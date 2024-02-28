import prisma from '~/server/db'
import { _setCookie, isObject } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { Prisma } from '@prisma/client';
import { Anonim, getModelName } from '@/type/intex';
import { selectProductCard, selectAnonim } from '@/server/utils/selectData';
import { generateSessionId } from '@/server/utils/session';
import { fetchWithCookie } from '@/composables/fetchWithCookie'



export default defineEventHandler(async(event) => {

    type f = HeadersInit 

    const cookie = getCookie(event, 'anonim_session_id')
//'anonim_session_id'
    console.log(cookie)
    const res = await $fetch.raw('/api/auth/anonim', { headers: { set: {
        'set-cookie': cookie
    } }})
    // const res =  await $fetch('/api/auth/anonim', { headers: { 'getSetCookie': cookie } })
    return null   
})

