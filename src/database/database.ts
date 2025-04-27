import { Sequelize } from "sequelize";
import dotenv from "dotenv";

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

// Verifica a conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

export default sequelize;
