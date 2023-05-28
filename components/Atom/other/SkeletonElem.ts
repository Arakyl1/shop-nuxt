
let animClass = 'liner__gradient-loader animate-loader-data'
let spanClassDefault =  'absolute -translate-y-1/2 left-0 top-1/2'
export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        class: {
            type: String
        },
        animated: {
            type: Boolean
        },
        spanClass: {
            type: String,
            default: 'h-3 w-full rounded-full'
        },
        loader: {
            type: [Boolean, ]
        },
        color: {
            type: String
        },
        baseColor: {
            type: String,
            default: 'bg-gray-100'
        },
        style: {}
    },
    setup(props, { slots, attrs }) {
        return () => h(props.tag, { class: [
            props.class, 'relative', props.loader ? 'text-transparent' : props.color 
        ] }, [
            slots.default(),
            props.loader ? h('span', { class: [
                props.spanClass, spanClassDefault, props.animated ? animClass : props.baseColor
        ]}) : null
        ])
    },
})