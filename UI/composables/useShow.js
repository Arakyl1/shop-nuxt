import { nextTick, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default (props, watchFun, element) => {
    const isActive = ref(false);
    const timer = ref(null);
    const route = useRoute();

    const mapEvent = {
        hover: { name: 'mouseenter', opt: { capture: true } },
        click: { name: 'click', opt: {} },
        focus: { name: 'focus', opt: { capture: true } },
        contextmenu: { name: 'contextmenu', opt: {} }
    };

    onMounted(() => {
        if (!('triggers' in props && props.triggers && props.autoClose)) return;

        props.triggers.forEach((trigger) => {
            if (trigger in mapEvent) {
                const event = mapEvent[trigger];
                window.addEventListener(event.name, watchElements, { ...event.opt });
            }
        });

        window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
        if (!('triggers' in props && props.triggers && props.autoClose)) return;

        props.triggers.forEach((trigger) => {
            if (trigger in mapEvent) {
                window.removeEventListener(mapEvent[trigger].name, watchElements);
            }
        });

        window.removeEventListener('resize', onResize);
    });

    watch(
        () => route.fullPath,
        () => close()
    );

    function open() {
        if (props.delay || props.delay === 0) {
            timer.value = setTimeout(() => {
                isActive.value = true;
                timer.value = null;
            }, props.delay);
        } else {
            isActive.value = true;
        }
    }

    async function close() {
        if (props.autoClose && timer.value) clearTimeout(timer.value);

        if (props.closeDelay || props.closeDelay === 0) {
            timer.value = setTimeout(() => {
                isActive.value = false;
                timer.value = null;
            }, props.closeDelay);
        } else {
            isActive.value = false;
        }
    }

    async function handlerEvent({ target }) {
        const elem = unref(element);
        const isThisElem =
            elem instanceof HTMLElement &&
            (target instanceof HTMLElement || target instanceof SVGElement) &&
            (elem.isEqualNode(target) || elem.contains(target));
        if (!isThisElem) close();
    }

    function onClick() {
        if (!props.triggers.includes('click')) return;
        nextTick(() => setTimeout(() => open()));
    }

    function onHover() {
        if (props.triggers.includes('hover')) open();
    }

    function onContextMenu(e) {
        if (!props.triggers.includes('contextmenu')) return;
        e.preventDefault();
        open();
    }

    function onFocus() {
        if (props.triggers.includes('focus')) open();
    }

    function watchElements(event) {
        if (isActive.value) watchFun ? watchFun(event) : handlerEvent(event);
    }

    function onResize() {
        if (isActive.value) close();
    }

    return { isActive, timer, open, close, onClick, onHover, onContextMenu, onFocus };
};
