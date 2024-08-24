import { h } from 'vue';

export default (props) => {
    return h('span', {
        class: `rounded-full aspect-ratio inline-block`,
        style: { backgroundColor: `var(--${props?.status})` }
    });
};
