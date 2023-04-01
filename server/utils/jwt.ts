import { H3Event } from "h3";
import jwt from "jsonwebtoken";
import { RuntimeConfig } from "@nuxt/schema";
import { UserCreateBase } from "~~/type/intex";

const generateAsccessToken = <T extends RuntimeConfig>(user: UserCreateBase, config: T) => {
    return jwt.sign({ userId: user.id}, config.jwtAccessSecret, {
        expiresIn: '1h'
    })
}
const generateRefrechToken = <T extends RuntimeConfig>(user: UserCreateBase, config: T) => {
    return jwt.sign({ userId: user.id}, config.jwtRefrechSecret, {
        expiresIn: '4h'
    })
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

export const generateTokens = async(user: UserCreateBase) => {
    const config = useRuntimeConfig()
    const accessToken = generateAsccessToken<typeof config>(user, config)
    const refrechToken = generateRefrechToken(user, config)
    
    return {
        accessToken,
        refrechToken
    }
}

export const sendRefrechToken = async (event: H3Event, token: string | null) => {
    if (!token) return
    setCookie(event, "refrech_token", token, {
        httpOnly: true,
        sameSite: true
    })
}