import { UserBase } from "~~/type/intex"

export const userTransform = <T extends UserBase>(user: T): UserBase => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage
    }
}