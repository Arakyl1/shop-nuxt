import { prismaCreate } from "~~/server/db/methods";
import { CharacteristicItem, ImageInfo } from "~~/type/intex";

export default defineEventHandler(async(event) => {
    const data = await readBody(event);

    const characteristic = async(id: number) => {
        console.log(id)
        for (let i = 0; i < data.characteristic.length; i++) {
            const elem = data.characteristic[i];
            const titleID = await prismaCreate('characteristic', { data: {
                title: elem.name, productCardId: id
            }})
            await characteristicItem(titleID.titleID, elem.content)
        }
    }

    const characteristicItem = async(id: number, array: CharacteristicItem[]) => {
        for (let i = 0; i < array.length; i++) {
            const item = array[i]; 
            prismaCreate('characteristicItem', { data: {
                name: item.name,
                value: item.value,
                characteristicTitle: id
            }}) 
        }
    }

    const image = async(id: number) => {
        console.log(id)
        const array: ImageInfo[] = data.image
        for (let i = 0; i < array.length; i++) {
            const el = array[i];
            prismaCreate('image', { data: { ...el, productCardId: id } })
        }
    }

    try {
        const product = await prismaCreate('productCard',{ data: data.main });
        await characteristic(product.id)
        await image(product.id)
        return true
    } catch (error) {
        return error
    }
})