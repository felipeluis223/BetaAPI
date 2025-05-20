import { Request, Response } from "express";
import Employee from "../../database/models/Employee";


// Obter todos os funcionários:
const getEmployee = async (req: Request, res: Response) => {
    try {
        const allEmployee = await Employee.findAll();
        if (allEmployee.length === 0) {
            return res.status(204).json({ message: "Nenhum funcionário cadastrado no momento." });
        }

        res.status(200).json(allEmployee);
    } catch (error) {
        res.status(500).json({ message: "Erro interno! Espere um pouco e tente novamente mais tarde." });
    }

};

export default getEmployee;