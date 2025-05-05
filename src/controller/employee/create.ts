import { Request, Response } from "express";
import Employee from "../../database/models/Employee";
import capitalizeWords from "../../utils/capitalizeWords";

const createEmployee = async (req: Request, res: Response) => {
    try {
        const { name, cpf, rg, email, phone } = req.body;

        const formatName = capitalizeWords(name);

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!name || !cpf || !rg || !email || !phone) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        // Criar o funcionário no banco de dados
        const newEmployee = await Employee.create({ name:formatName, cpf, rg, email, phone });

        return res.status(201).json(newEmployee);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar funcionário." });
    }
};

export default createEmployee;
