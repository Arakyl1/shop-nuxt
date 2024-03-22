import { defineAuthenticatedEventHandler } from "@/server/utils/auth"

export default defineAuthenticatedEventHandler((event, authUser) => true) 