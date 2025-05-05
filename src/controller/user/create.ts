import { Request, Response } from "express";
import User from "../../database/models/User";
import capitalizeWords from "../../utils/capitalizeWords";

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        // Verificar se o e-mail já é existente/cadastrado:
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Usuário já cadastrado com este e-mail." });
        }

        // Criar um novo usuário:
        const formatName = capitalizeWords(name);
        const newUser = await User.create({ name:formatName, email, password });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Não foi possível completar a ação. Verifique seus dados e tente novamente." });
    }
};

export default createUser;
