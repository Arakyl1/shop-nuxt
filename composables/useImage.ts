export default () => {
    const download = async (elem: File | FileList | string) => {
        try {
            if (elem instanceof FileList) {
                const promiseRes = Object.values(elem).map(async(_) => {
                    return $fetch('/api/cloudinari/upload', {
                        method: 'POST',
                        body: _,
                        params: { type: 'File'},
                        headers: { "Content-Type": "application/octet-stream" }
                    })
                })
                const res = (await Promise.all(promiseRes)).map(_ => _)
                
                return res.filter(_ => _ !== null) as NonNullable<typeof res[0]>[]
            } else if (elem instanceof File) {
                const { data } = await useFetch('/api/cloudinari/upload', {
                    method: 'POST',
                    body: elem,
                    params: { type: 'File' },
                    headers: { "Content-Type": "application/octet-stream" },
                })
                
                return data.value ? [data.value] : null
            } else if (typeof elem === 'string') {
                const { data } = await useFetch('/api/cloudinari/upload', {
                    method: 'POST',
                    body: { link: elem },
                    params: { type: 'String' },
                })
                return data.value ? [data.value] : null
            }
            return null
        } catch (error) {
            console.log(error);
            return null
        }
    }
    return { download: download }
}