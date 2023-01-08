import prisma from ".";
import bcrypr from "bcrypt"

interface User {
    name?: string | number,
    email: string,
    username: string,
    password: string | Buffer,
    profileImage: string
}

export const createUser = (userData: User) => {
    const updateUserData = {
        ...userData,
        password: bcrypr.hashSync(userData.password, 10)
    }
      
    return prisma.user.create({
        data: updateUserData,
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            profileImage: true
        }
    })
}

export const getUserByUsername = (username: any) => {
    return prisma.user.findUnique({
        where: {
            username
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            profileImage: true
        }
    })
}

export const getUserById = (userId: number) =>{
    return prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            profileImage: true
        }
    })
}

export const getInfoUserById = (userId: number) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            username: true,
            profileImage: true
        }
    })
}