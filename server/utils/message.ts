import { GET_CONTENT_KEY } from "../../utils/other";

export const authError = () => new Error(GET_CONTENT_KEY('AUTH_ERROR'))