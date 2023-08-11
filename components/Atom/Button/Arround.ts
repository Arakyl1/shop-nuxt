import { h, defineComponent } from 'vue'
import { default as _BT_BASE } from "~~/components/Atom/Button/Standart.vue";
import CreateIcon from "@/content/icons/create";

export default defineComponent ({
    setup(props: any, { attrs }: any) {
        return () => h(_BT_BASE, {
            ...attrs,
            class: 'bg-blue-500 aspect-square py-4  rounded flex items-center'
        },() => h(CreateIcon, {
            name: 'arround_8_15', att: { class: 'fill-white' } 
          })
        )
    }
})