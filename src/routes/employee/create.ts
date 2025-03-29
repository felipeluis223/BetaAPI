import { Request, Response } from "express";
import Employee from "../../database/models/Employee";


const createEmployee = async (req: Request, res: Response)=>{
    try{
        const { name, cpf, rg, email, phone }= req.body;
        const newUser = await Employee.create({ name, cpf, rg, email, phone });
        res.status(201).json(newUser);
    }catch(e){
        console.log('ERROR: ', e);
        res.status(500).json({e: "Erro ao criar usuário - funcionário..."});
    }
};

export default createEmployee;