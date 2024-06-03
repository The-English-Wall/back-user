import "dotenv/config"

import env from "env-var"

export const envs = {
    PORT_USER: env.get("PORT_USER").required().asPortNumber(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    // DB_URI: env.get("DB_URI").required().asString(),
    DB_PASSWORD: env.get("DB_PASSWORD").required().asString(),
    DB_NAME_USER: env.get("DB_NAME_USER").required().asString(),
    DB_USERNAME: env.get("DB_USERNAME").required().asString(),
    DB_HOST: env.get("DB_HOST").required().asString(),
    DB_PORT: env.get("DB_PORT").required().asString(),
    SECRET_JWD_SEED: env.get("SECRET_JWD_SEED").required().asString(),
    JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
    PORT_COMPANY: env.get("PORT_COMPANY").required().asString(),
    CLOUDINARY_NAME_PROCURE: env.get("CLOUDINARY_NAME_PROCURE").required().asString(),
    CLOUDINARY_API_KEY_PROCURE: env.get("CLOUDINARY_API_KEY_PROCURE").required().asString(),
    CLOUDINARY_API_SECRET_PROCURE: env.get("CLOUDINARY_API_SECRET_PROCURE").required().asString(),
}