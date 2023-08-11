interface SvgElemBaseParams {
    fill?: string,
    stroke?: string,
    'stroke-width'?: number,
    'stroke-miterlimit'?: number,
    /* attribute is a presentation attribute defining the pattern
    of dashes and gaps used to paint the outline of the shape
    */
    'stroke-dasharray'?: string,
    'stroke-dashoffset'?: number,
    'stroke-linecap'?: 'butt'|'round'|'square',
    'stroke-linejoin'?: 'arcs' | 'bevel' |'miter' | 'miter-clip '| 'round',
    'stroke-opacity'?: number
}

interface PathElem extends SvgElemBaseParams{
    d: string 
}

interface LineElem extends Omit<SvgElemBaseParams, 'stroke-linejoin'> {
    x1: number,
    x2: number,
    y1: number, 
    y2: number
}

interface IconType {
    width: number,
    height: number,
    path?: PathElem[],
    line?: LineElem[]
}

type g = NonNullable<IconType['path']>[0]['d']

export const plus: IconType = {
    width: 15,
    height: 15,
    line: [
        { x1: 1, x2: 14, y1: 7.5, y2: 7.5 },
        { x1: 1, x2: 14, y1: 7.5, y2: 7.5 }
    ]
}

export const add: IconType = {
    width: 15.2,
    height: 13.1,
    path: [
        { d: `M0.6,2.1c0-0.8,0.7-1.5,1.6-1.5h3.9v3c0,0.4,0.3,0.8,0.8,0.8H10v0.9c-1.8,0.5-3.1,2.1-3.1,4
        c0,1.4,0.7,2.6,1.8,3.4c-0.1,0-0.2,0-0.2,0H2.2c-0.9,0-1.6-0.7-1.6-1.5V2.1z M6.9,3.6v-3l3.1,3H6.9z M7.6,9.2c0-1.9,1.6-3.4,3.5-3.4
        s3.5,1.5,3.5,3.4s-1.6,3.4-3.5,3.4S7.6,11.1,7.6,9.2z M11.5,7.7c0-0.2-0.2-0.4-0.4-0.4c-0.2,0-0.4,0.2-0.4,0.4v1.1H9.6
        C9.4,8.9,9.2,9,9.2,9.2c0,0.2,0.2,0.4,0.4,0.4h1.2v1.1c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.1,0.4-0.4V9.6h1.2c0.2,0,0.4-0.1,0.4-0.4
        c0-0.2-0.2-0.4-0.4-0.4h-1.2V7.7z`}
    ]
}


