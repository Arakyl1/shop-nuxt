
// let spanClassDefault =  'absolute -translate-y-1/2 left-0 top-1/2'
let animClass = 'liner__gradient-loader animate-loader-data'
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
        loader: {
            type: [Boolean, ]
        },
        baseColor: {
            type: String,
            default: 'bg-gray-100'
        },
        style: {}
    },
    setup(props, { slots, attrs }) {
        return () => h(props.tag, { class: [
            props.class, props.loader ? 'visible' : 'hidden',
            props.animated ? animClass : props.baseColor,
            'text-transparent rounded bg-origin-content'
        ] }, { default: () => '_'})
    },
})