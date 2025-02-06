import dotenv from "dotenv";

dotenv.config();


interface EnvironmentVariables{
    MONGODB_URI:string,
RABBITMQ_URL:string,
PORT:string,
NODE_ENV: "development" | "production" | "test"
}


//validate and extract environment variables
const getEnvVariable = (key: keyof EnvironmentVariables):string=>
{
    const value = process.env[key as string];
    if(!value)
    {
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value;
}

export const env: EnvironmentVariables = {
    MONGODB_URI: getEnvVariable("MONGODB_URI"),
    RABBITMQ_URL: getEnvVariable("RABBITMQ_URL"),
    PORT: getEnvVariable("PORT"),
    NODE_ENV: getEnvVariable("NODE_ENV") as "development" | "production" | "test"
}