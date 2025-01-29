import {z} from "zod";

const EnvironmentVariablesObject = z.object({
    NEXT_PUBLIC_BACKEND_HOST: z.string(),

    PUBLIC_URL: z.string(),
    BACKEND_URL: z.string(),
    SECRET_KEY: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    RLS_DATABASE_URL: z.string(),
    NODE_ENV: z.string()
})

const EnvironmentVariables = EnvironmentVariablesObject.parse(process.env)

export default EnvironmentVariables
