export default () => {
    const copy = async (key: any) => {
        const permissionToUseClipboard = await navigator.permissions.query({ name: "clipboard-write" })
        if (permissionToUseClipboard.state === "granted" || permissionToUseClipboard.state === "prompt") {
            navigator.clipboard.writeText(key)
        }
    }
    return { copy }
}
