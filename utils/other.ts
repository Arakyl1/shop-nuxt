type SizeH = 'h_28'|'h_48'|'h_56'|'h_60'|'h_64'|'h_72'|'h_80'|'h_92'|'h_96'
type SizeW = 'w_28'|'w_48'|'w_56'|'w_60'|'w_64'|'w_72'|'w_80'|'w_92'|'h_96'

type TransfornSize = {
    heigth?: SizeH,
    width?: SizeW
}
export function changeValueImageSize(url:string, size?: TransfornSize): string {
    if (typeof size === 'object') {
        return url.replace(/upload\//, () => `upload/${ Object.values(size).join(',')}/`);
    } else { return url }
}2