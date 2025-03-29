import { Request, Response } from "express";
import User from "../../database/models/User";

// Obter todos os usuários:
const getUser = async (req: Request, res: Response) => {
    const allUsers = await User.findAll();
    res.json(allUsers);
};

export default getUser;