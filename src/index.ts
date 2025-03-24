import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/database";
import User from "./database/models/User";
import { login } from "./auth/authController";

// Obter os arquivos .env:
dotenv.config();

// Configuração da aplicação:
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

sequelize.sync({force: true}).then(()=>{
    console.log('Banco de Dados Sincronizados...');
});

// Rotas da aplicação:
app.get("/", (req, res)=>{
    res.send("Welcome in BETA");
});

// Caso o login seja bem-sucedido, retornamos o token do usuário:
app.get("/login", async (req, res)=>{
    const userToken = await login(req, res);
    res.json(userToken);
});

// Criando um usuário:
app.post("/users", async (req, res)=>{
    try{
        const { name, email, password } = req.body;
        const newUser = await User.create({name, email, password});

        res.status(201).json(newUser);
    } catch(e){
        console.log(`ERROR: ${e}`);
        res.status(500).json({error: "Erro ao criar usuário..."})
    }
});

// Obtendo todos os usuários:
app.get("/users", async (req, res)=>{
    const users = await User.findAll();
    res.json(users);
});

// Executando o servidor: 
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost: ${PORT}`);
});