export default function userTransform(user: object) {
    return {
        user.username,
        user.email,
        user.id,
        user.profileImage
    }
}