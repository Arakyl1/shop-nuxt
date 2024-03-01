type FORM = Ref<HTMLFormElement | null> | HTMLFormElement | null
export function resetForm(elem: FORM) {
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

export function searchInvalidElem(form: FORM) {
    const _form = unref(form)

    if (_form instanceof HTMLFormElement) {
        if (_form.checkValidity()) return true

        for (const elem of _form.elements) {
            if (!elem.validity.valid) {
                if (elem instanceof HTMLTextAreaElement ||
                    (elem instanceof HTMLInputElement && ['text','password','date','email'].includes(elem.type))
                ) {
                    elem.focus() 
                } else  {
                    elem.parentElement?.focus()
                }
                return false
            }
        }
        return true
    }
}
export function setValueInput(elem: FORM, setData: Map<string, string[]> ) {
    const _form = unref(elem)
    
    if (_form instanceof HTMLFormElement) {
        const event = new Event('change', { bubbles: true })

        function dispatchEvent(elem: HTMLInputElement | HTMLTextAreaElement) {
            elem.dispatchEvent(event)
        }
        for (const elem of _form.elements) {
            const elemName = elem.getAttribute('name') || ''
            const elemValid = setData.has(elemName) ? setData.get(elemName) : null;
     
            if (elem instanceof HTMLInputElement && elemValid && elemValid.length) {
                switch (elem.type) {
                    case 'email':
                    case 'text': {
                        elem.value = elemValid![0]
                        dispatchEvent(elem)
                        break;
                    }
                    case 'number': {
                        elem.valueAsNumber = parseFloat(elemValid![0])
                        dispatchEvent(elem)
                        break
                    }
                    case "radio":
                    case 'checkbox': {
                        if (elemValid!.includes(elem.value)) {
                            elem.checked = true
                        }
                    }
                }
                
            } else if (elem instanceof HTMLTextAreaElement && elemValid && elemValid.length) {
                elem.value = elemValid![0]
                dispatchEvent(elem)
            }
        }
    }
}