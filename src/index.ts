import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/database";
import { login } from "./auth/authController";
import createUser from "./controller/user/create";
import getUser from "./controller/user/getAll";
import createEmployee from "./controller/employee/create";
import getEmployee from "./controller/employee/getAll";

// Obter os arquivos .env:
dotenv.config();

// Configuração da aplicação:
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
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

// Criando um usuário:
app.post("/users", async (req, res) => { await createUser(req, res)});

// Obtendo todos os usuários:
app.get("/users", async (req, res) => { await getUser(req, res)});

// Caso o login seja bem-sucedido, retornamos o token do usuário:
app.post("/login", async (req, res) => { await login(req, res)});

// Criando um funcionário:
app.post("/employees", async (req, res) => { await createEmployee(req, res)});

// Obtendo todos os funcionários:
app.get("/employees", async (req, res) => { await getEmployee(req, res)});


// Executando o servidor: 
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost: ${PORT}`);
});