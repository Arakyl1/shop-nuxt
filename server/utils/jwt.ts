import jwt from "jsonwebtoken";


type generateToken = (data: { id: PropertyKey, role: string }) => string
export const generateToken: generateToken = (data) => {
    const config = useRuntimeConfig()
    return jwt.sign({ id: data.id, role: data.role }, config.jwtRefrechSecret, { expiresIn: '7d' })
}


export const decodeToken = (token: string, type: 'access' | 'refrech') => {
    const config = useRuntimeConfig()
    const secret = type === 'access' ? config.jwtAccessSecret : config.jwtRefrechSecret
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}
