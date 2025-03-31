import { Request, Response } from "express";
import User from "../../database/models/User";

// Obter todos os usuários:
const getUsers = async (req: Request, res: Response) => {
    const allUsers = await User.findAll();
    res.json(allUsers);
};

export default getUsers;