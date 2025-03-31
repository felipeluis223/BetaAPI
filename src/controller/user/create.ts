import { Request, Response } from "express";
import User from "../../database/models/User";

const createUser = async (req: Request, res: Response)=>{
    try{
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    }catch(e){
        console.log('ERROR: ', e);
        res.status(500).json({e: "Erro ao criar usuário..."});
    }
};

export default createUser;