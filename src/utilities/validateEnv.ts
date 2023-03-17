import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {

  cleanEnv(process.env, {
    // Database Envs
    NODE_ENV: str(),
    PORT: port(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),

    // Auth JWT envs
    JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
    JWT_ACCESS_TOKEN_PUBLIC_KEY: str(),
    JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
    JWT_REFRESH_TOKEN_PUBLIC_KEY: str(),

  });
};

export default validateEnv;
