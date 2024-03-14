import { GET_CONTENT_KEY } from "../../utils/other";

export const _createError = (s: string) => new Error(s)
export const authError = () => _createError(GET_CONTENT_KEY('AUTH_ERROR'))