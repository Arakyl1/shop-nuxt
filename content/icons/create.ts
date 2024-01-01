import { iconPath } from "./1";
import { SVGAttributes } from "nuxt/dist/app/compat/capi";

export type NameIcon = keyof typeof iconPath

interface Flavoring<FlavorT> {
    _type?: FlavorT;
}
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;


export interface Props {
    viewBox?: string,
    name: `${NameIcon}_${number}_${number}`,
    att?: SVGAttributes
  }

// {par: createIconArg, path: T | T[]}
export default defineComponent({
    setup (props: Props, { attrs }) {
        interface PD extends Props, Data {}
        const _elem = attrs as unknown as PD
        let params = _elem.name.split('_') as unknown as [NameIcon,string,string]
        let iconData = iconPath[params[0]]
        let iconDataAttr = iconData && 'other' in iconData ? iconData.other : {}
        if (!iconData) return () => null
        
        return () => h('svg', {
            xmlns:"http://www.w3.org/2000/svg",
            fill: "none",
            width: params[1],
            height: params[2],
            viewBox: _elem.viewBox || iconData.viewBox || ''
        },[
            h('g',{ ...iconDataAttr, ..._elem.att, 'data-type-icon': iconData.type  },
                iconData.data.map((_) => {
                    const key = Object.keys(_)[0] as unknown as 'path'
                    return Array.isArray(_[key] ) ? _[key].map(el => h(key, el)) : null
                })
            )
        ] )
    }
})
// [
//     iconData && 'path' in iconData && Array.isArray(iconData.path) ?
//     iconData.path.map(_ => (h('path', _ ))) :
//     null,
//     iconData && 'line' in iconData && Array.isArray(iconData.line) ?
//     iconData.line.map(_ => (h('line', _ ))) :
//     null,
//     iconData && 'circle' in iconData && Array.isArray(iconData.circle) ?
//     iconData.circle.map(_ => (h('circle', _ ))) :
//     null,
    
// ].flat(1)