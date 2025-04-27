import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/database";
import { login } from "./auth/authController";
import { authenticate } from "./auth/authMiddleware";
import createEmployee from "./controller/employee/create";
import getEmployee from "./controller/employee/getAll";
import { googleLogin } from "./auth/googleLogin";

import useRoutes from "./routes/user";

// Obter os arquivos .env:
dotenv.config();

// Configuração da aplicação:
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());

// Resetando os dados do DB:
sequelize.sync({ force: true }).then(() => {
    console.log("Banco de Dados Sincronizados...");
});

// Rotas da aplicação:
app.get("/", (req, res) => {
    res.send("Welcome in BETA");
});

// Autenticação de login público:
app.post("/login", async (req, res) => {
    await login(req, res);
});

// Autenticação de login - Google:
app.post("/auth/google", googleLogin);

// // Rotas protegidas de usuários:
app.use('/users', useRoutes);

// Executando o servidor:
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
