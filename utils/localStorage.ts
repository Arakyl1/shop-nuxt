

export const myGetItem = (key: string) => localStorage.getItem(key)
export const mySetItem = (key: string, elem: any) => localStorage.setItem(key, JSON.stringify(elem))
export const myRemoveItem = (key: string) => localStorage.removeItem(key)