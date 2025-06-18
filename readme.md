# Sistema Beta - API

A **Beta API** é uma interface RESTful projetada para fornecer acesso eficiente e seguro a recursos e dados internos de aplicações. Esta API está em fase **beta**, ou seja, sujeita a alterações durante a evolução de seu desenvolvimento.

## 🚀 Funcionalidades

- Registro de usuários
- Autenticação com token JWT
- Listagem e gerenciamento de dados
- Rotas públicas e protegidas
- Suporte a JSON como formato de entrada e saída

## 📦 Tecnologias Utilizadas

- Node.js com Express
- JWT para autenticação
- PostgreSQL
- Sequelize ORM

## 📂 Estrutura do Projeto
```bash
beta-api/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── app.js
├── .env
├── package.json
└── README.md


```




## 🔧 Repositório e instalação de dependências

1. Clone o repositório:

```bash
git clone https://github.com/felipeluis223/BetaAPI.git
```

2. Instalando as dependências:

```bash
cd BetaAPI
npm install
```

3. Configurando o arquivo ".env":
```bash
JWT_SECRET= assinatura jwt
DB_NAME= nome banco de dados
DB_USER= usuario banco de dados
DB_PASSWORD= senha banco de dados
DB_HOST= host banco de dados
DB_DIALECT= linguagem sql banco de dados
PORT= porta em execução - API
GOOGLE_CLIENT_ID = Autenticação via Google https://console.cloud.google.com/
```

4. Formas de executar o projeto:
    - Executando localhost:
    ```bash
    npm run dev 
    ```

    - Executando em produção:
    ```bash
    npm run dev -- --host
    ```

## Interface de Login:
Realizar login de duas formas: 
- Autenticação pública (email e senha).
- Autenticação via Google.

Após a verificação e autenticação será redirecionado para a home:
```bash
/home
```
