import { H3Event } from "h3"
import supabase from "@/server/db/supabase";

export default defineEventHandler(async(event: H3Event) => {
    const { data, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password',
    })
    console.log(data, error)

    return data
})