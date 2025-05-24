import { Request, Response } from 'express';
import Employee from '../../database/models/Employee';

const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, cpf, rg, phone } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID do funcionário é obrigatório na URL." });
        }

        // Buscar o funcionário no banco pelo ID:
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ message: "Funcionário não encontrado." });
        }

        // Atualizar apenas os campos enviados:
        if (name !== undefined) employee.name = name;
        if (email !== undefined) employee.email = email;
        if (cpf !== undefined) employee.cpf = cpf;
        if (rg !== undefined) employee.rg = rg;
        if (phone !== undefined) employee.phone = phone;

        // Salvar as alterações no banco:
        await employee.save();
        return res.status(200).json({ message: "Funcionário atualizado com sucesso.", employee });
        
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default updateEmployee;
