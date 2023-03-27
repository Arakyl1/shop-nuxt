export default () => {
    const copyLink = async () => {
        const { createAlert } = useAlert()
        const permissionToUseClipboard = await navigator.permissions.query({ name: "clipboard-write" })
        if (permissionToUseClipboard.state === "granted" || permissionToUseClipboard.state === "prompt") {
            navigator.clipboard.writeText(window.location.href)
            createAlert('Ссылка скопирована')
        }
    }
    return { copyLink }
}
