import { prismaCreate } from "~~/server/db/methods";


export default defineEventHandler(async(event) => {
    
    const data = await readBody(event);

    const characteristic = async(id: number) => {
        for (let i = 0; i < data.characteristic.characteristic.length; i++) {
            const elem = data.characteristic.characteristic[i];
            const titleID = await prismaCreate('characteristic', { data: {
                title: elem.name, productCardId: id
            }})
            await characteristicItem(titleID.titleID, elem.content)
        }
    }

    const characteristicItem = async(id: any, array: object[]) => {
        for (let i = 0; i < array.length; i++) {
            const item = array[i]; 
            prismaCreate('characteristicItem', { data: {
                name: item.name,
                value: item.value,
                characteristicTitle: id
            }}) 
        }
    }

    try {
        const product = await prismaCreate('roductCard',{ data: data.main });
        await characteristic(product.id)
        return true
    } catch (error) {
        return error
    }
})