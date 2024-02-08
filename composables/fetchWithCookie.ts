import { appendResponseHeader, H3Event } from 'h3'

type gg = Parameters<typeof $fetch.raw>
export const fetchWithCookie = async (event: H3Event, url: string, request: gg['1'] = {} as gg[1]) => {
    const headers = useRequestHeaders(['cookie'])
    /* Get the response from the server endpoint */
    const res = await $fetch.raw(url, { headers, ...request})
    /* Get the cookies from the response */
    const cookies = (res.headers.get('set-cookie') || '').split(',')
    /* Attach each cookie to our incoming Request */
    for (const cookie of cookies) {
        try {
            appendResponseHeader(event, 'Set-Cookie', cookie)
        } catch (error) {
            console.log('cookie installation error in fetchWithCookie')
        }
    }
    /* Return the data of the response */
    return res._data
}