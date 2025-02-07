import dotenv from "dotenv";

dotenv.config();


interface EnvironmentVariables{
MONGODB_URI:string,
JWT__SECRET:string
RABBITMQ_URL:string,
PORT:string,
NODE_ENV: "development" | "production" | "test"
SENTRY_DSN:string
}


//validate and extract environment variables
const getEnvVariable = (key: keyof EnvironmentVariables):string=>
{
    const value = process.env[key];
    if(!value)
    {
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value;
}

export const env: EnvironmentVariables = {
    MONGODB_URI: getEnvVariable("MONGODB_URI"),
    JWT__SECRET: getEnvVariable("JWT__SECRET"),
    RABBITMQ_URL: getEnvVariable("RABBITMQ_URL"),
    PORT: getEnvVariable("PORT"),
    NODE_ENV: getEnvVariable("NODE_ENV") as "development" | "production" | "test",
    SENTRY_DSN: getEnvVariable("SENTRY_DSN"),
}