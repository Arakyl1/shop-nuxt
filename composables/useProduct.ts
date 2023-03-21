import { ProductCard } from "@prisma/client";
import { CreateUser } from "~~/type/intex";

export default () => {
    const create = async(data: CreateUser) => {
        try {
            return await $fetch('/api/product/create', {
                method: "POST",
                body: JSON.stringify(data)
             })
        } catch (error) {
            console.log(error);
        }
    }
    const update = async (data: object) => {
        try {
            return await $fetch('/api/product/update', {
                method: "PUT",
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error);
        }
    }
  
    const getInfo = async<T = ProductCard>(data: object = {}, params?: string): Promise<T|void> => {
        try {
            return await $fetch(`/api/product/get${params ? '?'+params : ''}`, {
                method: "POST",
                body: JSON.stringify(data),
            })
        } catch (error) {
            console.error(error);  
        }
    }
    return { create, update, getInfo }
}