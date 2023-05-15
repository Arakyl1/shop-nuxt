import { ProductCard } from "@prisma/client";
import { KeyOfRes, _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { UseFetchOptions } from "nuxt/dist/app/composables/fetch";
import { CharacteristicBlock } from "~~/type/intex";

export default () => {
    const create = async<T = ProductCard>(data: { main: T, characteristic?: CharacteristicBlock[] }) => {
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

    const getInfo = async<T = ProductCard>(
        body: object = {},
        query?: object,
        _options?: UseFetchOptions<T extends void ? any : T, (res: T extends void ? any : T) => T extends void ? any : T, KeyOfRes<(res: T extends void ? any : T) => T extends void ? any : T>> | undefined ) => {
        return await useFetch<T>('/api/product/get', {
            method: 'POST',
            body: JSON.stringify(body),
            query: query,
            ..._options
        })
    }
    return { create, update, getInfo }
}