import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const config = useRuntimeConfig()
const supabase = createClient('https://emjfslurkgzkgubyhvpy.supabase.co', config.supabase_public_key)

export default supabase