import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/database";
import userRoutes from "./routes/user";
import employeeRoutes from "./routes/employee";
import loginPublic from "./routes/authentication/index";
import googleRoutes from "./routes/authentication/google";

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

// Autenticação de login - público:
app.use("/login", loginPublic);

// Autenticação de login - Google:
app.use("/auth/google", googleRoutes);

// // Rotas protegidas de usuários:
app.use('/users', userRoutes);

// // Rotas protegidas de usuários:
app.use('/employees', employeeRoutes);


// Executando o servidor:
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
