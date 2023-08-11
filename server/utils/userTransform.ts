// import { UserBase } from "~~/type/intex"

// export const userTransform = <T extends UserBase>(user: T): UserBase => {
//     return {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         username: user.username,
//         profileImage: user.profileImage
//     }
// }

import { Prisma } from "@prisma/client"
import { ReplaceDate } from "@/type/intex"


// export const chatRoomSelect = Prisma.validator<Prisma.UserArgs['select']>()({
//     chatRoom: {
//         select: {
//             id: true,
//             name: true,
//             tokenId: true,
//             createAt: true,
//             chatRoomImage: true,
//             messadge: {
//                 take: 1,
//                 orderBy: { 'createAt': 'desc' },
//                 select: {
//                     authorId: true,
//                     id: true,
//                     value: true,
//                     visible: true,
//                     createAt: true,
                    
//                     author: {
//                         select: { 
//                             id: true,
//                             name: true,
//                             username: true,
//                             dataLastVisit: true,
//                             profileImage: true,
//                             email: true,
//                         }
//                     }
//                 }
//             },
//             participants: {
//                 select: { 
//                     id: true,
//                     name: true,
//                     username: true,
//                     dataLastVisit: true,
//                     profileImage: true,
//                     email: true,
//                     connectToken: true
//                 }
//             }
//         }
//     }
// })

export const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
    select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profileImage: true,
        createAt: true,
    },
})

export type _UserPersonalData = Prisma.UserGetPayload<typeof userPersonalData>



export const userTransform = <T extends _UserPersonalData>(user: T): _UserPersonalData => {
    if ('password' in user) {
        delete(user.password)
        return user
    }
    return user
}
