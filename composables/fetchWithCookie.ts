export const fetchWithCookie = async ( url: string) => {
    const event = useRequestEvent()
    const headers = useRequestHeaders(['cookie'])
    console.log(headers)
    /* Get the response from the server endpoint */
    const res = await $fetch.raw(url, { headers })

    /* Get the cookies from the response */
    const cookies = (res.headers.get('set-cookie') || '').split(',')
    /* Attach each cookie to our incoming Request */
    for (let i = 0, l = cookies.length; i < l; i++) {
        const cookie = cookies[i];
        console.log('set-cookie: ' + cookie)
        appendResponseHeader(event, 'Set-Cookie', cookie)
        console.log(getResponseHeader(event, 'Set-Cookie'))
    }
    /* Return the data of the response */
    return res._data
  }