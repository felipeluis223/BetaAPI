import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carregar variáveis do arquivo .env
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME ?? "default_db",
    process.env.DB_USER ?? "default_user",
    process.env.DB_PASSWORD ?? "default_password",
    {
        host: process.env.DB_HOST ?? "localhost",
        dialect: (process.env.DB_DIALECT as any) ?? "postgres"
    }
);

export default sequelize;
