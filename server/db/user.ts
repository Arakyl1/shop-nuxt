import prisma from ".";
import bcryptjs from "bcryptjs";

interface User {
    name?: string,
    email: string,
    username: string,
    password: string,
    profileImage: string
}

export const createUser = (userData: User) => {
    const salt = bcryptjs.genSaltSync(10);
    const updateUserData = {
        ...userData,
        password: bcryptjs.hashSync(userData.password, salt)
    }
      
    return prisma.user.create({
        data: updateUserData,
        select: {
            email: true,
            username: true,
            profileImage: true,
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