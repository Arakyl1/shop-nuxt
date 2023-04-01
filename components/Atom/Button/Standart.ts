import { h, defineComponent } from 'vue'

export default defineComponent ({
    setup(props, { slots, attrs }: any) { 
        return () => h('button', {
            ...attrs,
            type: 'button',
            class: 'bt-base after:content-[" "]'
        }, slots.default())
    }
})