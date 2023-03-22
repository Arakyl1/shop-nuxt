
export function returnParamsMain<T extends object = {}>(where: object, select: T) {
    return {
        where: where,
        select: {
            username: true,
            profileImage: true,
            ...select
        }
    }
}

export function returnParamsAditional<T extends object = {}>(select: T){
    return {
        id: true,
        name: true,
        email: true,
        ...select
    }
}