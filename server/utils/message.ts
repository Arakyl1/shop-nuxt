import { GET_CONTENT_KEY } from "../../utils/other";

export const _createError = (s: string) => new Error(s)
export const authError = () => _createError(GET_CONTENT_KEY('AUTH_ERROR'))
export const errorMissingParams = (k: string) => _createError(`the "${k}" parameter is missing`)
export const errorInvalidParams = (k: string, v: string | number) => _createError(`invalid value "${v ? v : 'undefine'}" for params'${k}'`)