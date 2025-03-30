import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/database";
import User from "./database/models/User";
import { login } from "./auth/authController";
import createUser from "./routes/user/create";
import getUser from "./routes/user/getUser";
import createEmployee from "./routes/employee/create";
import getEmployee from "./routes/employee/getEmployee";

// Obter os arquivos .env:
dotenv.config();

// Configuração da aplicação:
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: "http://localhost:5173", // Permitir requisições do frontend
        methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
        credentials: true, // Se precisar enviar cookies ou autenticação
    }
));
app.use(express.json());

sequelize.sync({force: true}).then(() => {
    console.log('Banco de Dados Sincronizados...');
});

// Rotas da aplicação:
app.get("/", (req, res) => {
    res.send("Welcome in BETA");
});

// Caso o login seja bem-sucedido, retornamos o token do usuário:
app.post("/login", async (req, res) => { await login(req, res)});

// Criando um usuário:
app.post("/users", async (req, res) => { await createUser(req, res)});

// Obtendo todos os usuários:
app.get("/users", async (req, res) => { await getUser(req, res)});

// Criando um funcionário:
// app.post("/employees", async (req, res) => { await createEmployee(req, res)});

// Obtendo todos os funcionários:
app.get("/employees", async (req, res) => { await getEmployee(req, res)});


// Executando o servidor: 
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost: ${PORT}`);
});