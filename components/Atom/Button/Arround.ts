import { h, defineComponent } from 'vue'
import { default as _BT_BASE } from "@/components/Atom/Button/Standart";
import IconArround  from '@/components/Icon/Arround';

export default defineComponent ({
    setup(props: any, { attrs }: any) {
        return () => h(_BT_BASE, {
            ...attrs,
            class: 'bg-blue-500 aspect-square py-4  rounded flex items-center'
        },() => h(IconArround, {
            class: 'group-[.big]:w-2 group-[.big]:h-5 ddddd'
          })
        )
    }
})