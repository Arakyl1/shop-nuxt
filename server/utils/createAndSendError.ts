import { H3Event } from "h3"

export default (event: H3Event, code: number, text: string) => {
    sendError(event, createError({
        statusCode: code,
        statusMessage: text
    }))
} 