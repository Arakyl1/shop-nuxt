export function resetForm(elem: HTMLFormElement) {
    const form = unref(elem)
    if (form instanceof HTMLFormElement) {
        form.reset()
        const customEvent = new CustomEvent('reset', { bubbles: false })
        for (const elem of form.elements) {
           if (elem instanceof HTMLInputElement) {
                if (elem.closest('[data-ranting]') ||
                    elem.closest('[data-file-image]')
                ) {
                    elem.dispatchEvent(customEvent)
                } 
           }
        }
    } 
}

export function searchInvalidElem(form: HTMLFormElement) {
    const _form = unref(form)

    if (_form instanceof HTMLFormElement) {
        if (_form.checkValidity()) return true

        for (const elem of _form.elements) {
            if (!elem.validity.valid) {
                elem instanceof HTMLTextAreaElement ? elem.focus() : elem.parentElement?.focus()
                return false
            }
        }
        return true
    }
}
export function setValueInput(elem: HTMLFormElement, setData: Map<string, string[]> ) {
    const _form = unref(elem)

    if (_form instanceof HTMLFormElement) {
        const elms = _form.elements
        const event = new Event('input', { bubbles: false })

        for (const elem of elms) {
            const elemName = elem.getAttribute('name') || ''
            const elemValid = setData.has(elemName) ? setData.get(elemName) : false;

            if (elem instanceof HTMLInputElement && elemValid && elemValid.length) {
                switch (elem.type) {
                    case 'email':
                    case 'text': {
                        elem.value = elemValid[0]
                        elem.dispatchEvent(event)
                        break;
                    }
                    case 'number': {
                        elem.valueAsNumber = parseFloat(elemValid[0])
                        break
                    }
                    case "radio":
                    case 'checkbox': {
                        if (elemValid.includes(elem.value)) {
                            elem.checked = true
                        }
                    }
                }
            }
        }
    }
}