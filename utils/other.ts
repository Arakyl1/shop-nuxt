type Size = 'h_48'|'h_56'|'h_96'
type TransfornSize = {
    heigth?: Size,
    width?: Size
}
export function changeValueImageSize(url:string, size?: TransfornSize): string {
    if (typeof size === 'object') {
        return url.replace(/upload\//, () => `upload/${ Object.values(size).join(',')}/`);
    } else { return url }
}