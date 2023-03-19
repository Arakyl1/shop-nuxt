import { h } from 'vue'
import UIStandart from "@/components/UI/Standart";
import UIIconArround from "@/components/UI/Icon/Arround";

interface Props {
    
}
export default (props?: Props , ) => {
    return h(UIStandart, {
        class: 'bg-blue-500 aspect-square py-4  rounded flex items-center',
    },() => h(UIIconArround, {
        class: 'group-[.big]:w-2 group-[.big]:h-5 ddddd'
      })
    )
}