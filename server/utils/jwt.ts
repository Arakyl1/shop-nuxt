import { H3Event } from "h3";
import jwt from "jsonwebtoken";

type GenerateToken = <T extends ReturnType<typeof useRuntimeConfig>, U extends { id: PropertyKey }>(data: U, config: T) => string
const generateAccessToken: GenerateToken = (data, config) => {
    return jwt.sign({ id: data.id}, config.jwtAccessSecret, {
        expiresIn: '1h'
    })
}
const generateRefrechToken: GenerateToken = (data, config) => {
    return jwt.sign({ id: data.id}, config.jwtRefrechSecret, {
        expiresIn: '4h'
    })
}

type generateToken = (data: { id: PropertyKey }) => string
export const generateToken: generateToken = (data) => {
    const config = useRuntimeConfig()
    return jwt.sign({ id: data.id}, config.jwtRefrechSecret, { expiresIn: '7d' })
}

export const decodeRefrechToken = (token: string) => {
    const config = useRuntimeConfig()
    try {
        return jwt.verify(token, config.jwtRefrechSecret)
    } catch (error) {
        return null
    }
}

export const decodeAccessToken = (token: string) => {
    const config = useRuntimeConfig()
    try {
        return jwt.verify(token, config.jwtAccessSecret)
    } catch (error) {
        return null
    }
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

export const generateTokens = async<U extends { id: PropertyKey }>(data: U) => {
    const config = useRuntimeConfig()
    const accessToken = generateAccessToken(data, config)
    const refrechToken = generateRefrechToken(data, config)
    
    return {
        accessToken,
        refrechToken
    }
}