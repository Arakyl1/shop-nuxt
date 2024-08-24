import { onBeforeUnmount, onMounted } from '#imports';

export default () => {
    function checkPositionScroll(e: Event, funcScroll: (...arg: any[]) => any) {
        e.stopPropagation();
        const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;

        if (scrollTop + clientHeight >= scrollHeight - 3) {
            funcScroll && funcScroll();
        }
    }

    function addListenerScroll(handleScroll: (...arg: any[]) => any) {
        onMounted(() => {
            const elem = document.querySelector('[data-scroll-body]');
            if (elem instanceof HTMLElement) {
                elem.addEventListener('scroll', handleScroll);
            }
        });

        onBeforeUnmount(() => {
            const elem = document.querySelector('[data-scroll-body]');
            if (elem instanceof HTMLElement) {
                elem.removeEventListener('scroll', handleScroll);
            }
        });
    }
    return { addListenerScroll, checkPositionScroll };
};
