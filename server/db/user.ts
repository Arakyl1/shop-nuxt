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
            id: true,
            email: true,
            name: true,
            username: true,
            profileImage: true,
        }
    })
}

export const getUser = (params: { where: object, select: object}) => {
    return prisma.user.findUnique(params)
}