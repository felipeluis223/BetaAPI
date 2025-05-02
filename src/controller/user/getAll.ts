import { Request, Response } from "express";
import User from "../../database/models/User";

// Obter todos os usuários registrados:
const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.findAll();
        
        // Se não houver usuários registrado na base de dados:
        if (allUsers.length === 0) {
            return res.status(204).send();
        }

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Erro interno! Espere um pouco e tente novamente mais tarde." });
    }
};

export default getUsers;
