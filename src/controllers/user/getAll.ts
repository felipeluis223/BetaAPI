import { Request, Response } from "express";
import User from "../../database/models/User";

// Obter todos os usuários:
const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.findAll();
        if (allUsers.length === 0) {
            return res.json({ message: "Nenhum usuário cadastrado no momento." });
        }

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Erro interno! Espere um pouco e tente novamente mais tarde." });
    }
};

export default getUsers;
