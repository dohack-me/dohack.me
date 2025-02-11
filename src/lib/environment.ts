import {z} from "zod";

const EnvironmentVariablesObject = z.object({
    NEXT_PUBLIC_BACKEND_HOST: z.string(),
    PUBLIC_URL: z.string(),
    BACKEND_URL: z.string(),
    BACKEND_SECRET_KEY: z.string(),
    DATABASE_URL: z.string(),
    AUTH_SECRET: z.string(),
    NODE_ENV: z.string()
})

const EnvironmentVariables = EnvironmentVariablesObject.parse(process.env)

export default EnvironmentVariables
