import { isServer } from "#imports";
export default () => {
    if (isServer()) return;
    const copy = async (key: string) => {
        const permissionToUseClipboard = await navigator.permissions.query({ name: "clipboard-write" })
        if (permissionToUseClipboard.state === "granted" || permissionToUseClipboard.state === "prompt") {
            navigator.clipboard.writeText(key)
        }
    }
    return { copy }
}
