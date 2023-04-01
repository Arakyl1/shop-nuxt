import { h } from 'vue'

export default (props: any, { slots }: any) => h(
    'p', {
        class: "bg-blue-500 text-white text-xs absolute -bottom-1 rounded-md px-1"
    }, slots.default(0)
)