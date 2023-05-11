export type ResponseDownloadImage = { url: string; secretUrl: string; }

export default () => {
    const doowload = async (elem: File): Promise<(ResponseDownloadImage | null)[]> => {
        try {
            return await $fetch('/api/cloudinari/upload', {
                method: 'POST',
                body: elem,
                headers: {
                    "Content-Type": "application/octet-stream"
                }
            })
        } catch (error) {
          return doowload(elem)
        }
    }
    return { doowload }
}