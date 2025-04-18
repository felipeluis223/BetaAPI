import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/database";
import { login } from "./auth/authController";
import { authenticate } from "./auth/authMiddleware";
import createUser from "./controller/user/create";
import getUser from "./controller/user/getAll";
import createEmployee from "./controller/employee/create";
import getEmployee from "./controller/employee/getAll";

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

sequelize.sync({ force: true }).then(() => {
    console.log("Banco de Dados Sincronizados...");
});

// Rotas da aplicação:
app.get("/", (req, res) => {
    res.send("Welcome in BETA");
});

// Login público
app.post("/login", async (req, res) => {
    await login(req, res);
});

// Rotas protegidas:
app.post("/users", async (req, res) => {
    await createUser(req, res);
});

app.get("/users", authenticate, async (req, res) => {
    await getUser(req, res);
});

app.post("/employees", authenticate, async (req, res) => {
    await createEmployee(req, res);
});

app.get("/employees", authenticate, async (req, res) => {
    await getEmployee(req, res);
});

// Executando o servidor:
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
