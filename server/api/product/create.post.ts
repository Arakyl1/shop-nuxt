import { prismaAddProductCharacteristic, prismaAddProductCharacteristicItem, prismaCreateProduct } from "~~/server/db/product";
import createAndSendError from "~~/server/utils/createAndSendError";


export default defineEventHandler(async(event) => {
    
    const data = await readBody(event);

    const characteristic = async(id: number) => {
        for (let i = 0; i < data.characteristic.characteristic.length; i++) {
            const elem = data.characteristic.characteristic[i];
            const titleID = await prismaAddProductCharacteristic({
                title: elem.name, productCardId: id
            })
            await characteristicItem(titleID.titleID, elem.content)
        }
    }

    const characteristicItem = async(id: any, array: object[]) => {
        for (let i = 0; i < array.length; i++) {
            const item = array[i]; 
            await prismaAddProductCharacteristicItem({
                name: item.name,
                value: item.value,
                characteristicTitle: id
            }) 
        }
    }

    try {
        const product = await prismaCreateProduct(data.main);
        await characteristic(product.id)
        return true
    } catch (error) {
        return error
        // return createAndSendError(event, 404, "Something went wrong try again later")
    }
})