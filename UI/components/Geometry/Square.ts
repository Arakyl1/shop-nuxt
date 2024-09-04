import { h } from 'vue';

export default (props) => {
    return h('span', {
        class: `aspect-ratio inline-block`,
        style: { backgroundColor: `var(--${props?.status})`, borderRadius: '2px' }
    });
};
