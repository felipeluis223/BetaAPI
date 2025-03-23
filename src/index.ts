import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Obter os arquivos .env:
dotenv.config();

// Configuração da aplicação:
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da aplicação:
app.get("/", (req, res)=>{
    res.send("Servidor rodando com TypeScript");
});

// Executando o servidor: 
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost: ${PORT}`);
});