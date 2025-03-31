import { Request, Response } from "express";
import Employee from "../../database/models/Employee";

const createEmployee = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, email, phone } = req.body;

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!name || !cpf || !rg || !email || !phone) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
        }

        // Criar o funcionário no banco de dados
        const newEmployee = await Employee.create({ name, cpf, rg, email, phone });

        return res.status(201).json(newEmployee);
    } catch (error) {
        console.error("ERROR: ", error);
        return res.status(500).json({ error: "Erro ao criar funcionário." });
    }
};

export default createEmployee;
