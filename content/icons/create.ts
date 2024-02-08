import { iconPath } from "./1";
import { SVGAttributes } from "nuxt/dist/app/compat/capi";
import { computed, ref } from 'vue'

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

        const params = computed(() => attrs.name.split('_') as unknown as [NameIcon, string, string])
        const iconData = computed(() => iconPath[params.value[0]])
        const iconDataAttr = computed(() => iconData.value && 'other' in iconData.value ? iconData.value.other : {})
        
        if (!iconData.value) return () => null
        
        return () => h('svg', {
            xmlns:"http://www.w3.org/2000/svg",
            fill: "none",
            width: params.value[1],
            height: params.value[2],
            viewBox: props.viewBox || iconData.value.viewBox || ''
        },[
            h('g',{ ...iconDataAttr.value, ...props.att, 'data-type-icon': iconData.value.type  },
                iconData.value.data.map((_) => {
                    const key = Object.keys(_)[0] as unknown as 'path'
                    return Array.isArray(_[key] ) ? _[key].map(el => h(key, el)) : null
                })
            )
        ] )

    }
})
