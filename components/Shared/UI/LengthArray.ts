
import { h } from 'vue'

interface Props {}

export default (props?: Props, { slots }) => h(
    'p', { class: "bg-blue-500 text-white text-xs absolute -bottom-1 rounded-md px-1"}, slots.default(0)
)