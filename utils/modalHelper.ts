type handlerPromiseParamsElem = Ref<HTMLElement | null> | HTMLElement | null
export async function handlerPromise(
    elem: handlerPromiseParamsElem,
    resolveFun?: (...arg: any[]) => any,
    rejectionFun?: (...arg: any[]) => any
): Promise<void> {
    const _elem = unref(elem);

    if (!(_elem instanceof HTMLElement)) {
        return Promise.reject(new Error('Element is not valid'));
    }


    return new Promise<any>((resolve) => {

        function onClick({ target }: MouseEvent) {
            
            if (target instanceof HTMLElement || target instanceof SVGAElement) {
                const statusElem = target.closest('[data-promise-status]') as HTMLElement | null;
                
                if (!statusElem) {
                    if (!target.closest('[data-confirm]')) {
                        resolve('empty');
                    }
                    return;
                }
            
                const status = statusElem.dataset.promiseStatus || '';
            
                switch (status) {
                    case 'accept':
                        resolveFun && resolveFun();
                        resolve('accept');
                        break;
                
                    case 'rejection':
                        rejectionFun && rejectionFun();
                        resolve('rejection');
                        break;
                
                    default:
                        resolve('unknown');
                        break;
                }
            
                _elem!.removeEventListener('click', onClick)
            }
        }

        _elem.addEventListener('click', onClick);
    })
}