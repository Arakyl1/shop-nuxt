import { h } from 'vue'
import UIStandart from "@/components/UI/Standart";
import UIIconShare from "@/components/UI/Icon/Share";

interface Props {
    
}
export default (props?: Props ) => {
    return h(UIStandart, null, () => h(UIIconShare))
}