import { h } from 'vue'
import AtomButtonStandart from "@/components/Atom/Button/Standart.vue"
import IconShare from '@/components/Icon/Share';

export default (props: any ) => {
    return h(AtomButtonStandart, null, () => h(IconShare))
}