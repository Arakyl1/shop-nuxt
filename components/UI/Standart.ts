import { h, defineComponent } from 'vue'

interface Props {
    
}

export default defineComponent ({
    setup(props: any, { slots, attrs }: any) {
        return () => h('button', {
            ...attrs,
            type: 'button',
            class: 'bt-base after:content-[" "]'
        }, slots.default())
    }
})