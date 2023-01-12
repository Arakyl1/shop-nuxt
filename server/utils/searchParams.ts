export function searchByid(id: number) {
    return {
        where: {
            id: id
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            profileImage: true
        }
    }
}

export function searchByIdSecondary(userId: number) {
    return {
        where: {
            id: userId
        },
        select: {
            username: true,
            profileImage: true
        }
    }
}

export function searchByidUsername(username: string) {
    return {
        where: {
            username: username
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            profileImage: true,
            password: true
        }
    }
}