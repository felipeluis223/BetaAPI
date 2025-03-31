import { Request, Response } from "express";
import Employee from "../../database/models/Employee";


// Obter todos os funcionários:
const getEmployee = async (req: Request, res: Response) => {
    const allEmployee = await Employee.findAll();
    res.json(allEmployee);
};

export default getEmployee;