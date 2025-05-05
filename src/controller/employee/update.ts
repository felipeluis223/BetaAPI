import { Request, Response } from 'express';
import Employee from '../../database/models/Employee';

const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id, name, email } = req.body;

        // Se o parâmetro ID não estiver presente:
        if (!id) {
            return res.status(400).json({ message: "ID do usuário é obrigatório." });
        };

        // Buscar o usuário no banco pelo ID:
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(204).send();
        }

        // Atualizar apenas os campos enviados:
        if (name !== undefined) employee.name = name;
        if (email !== undefined) employee.email = email;

        // Salvar as alterações no banco:
        await employee.save();
        return res.status(200).json({ message: "Usuário atualizado com sucesso.", employee });
        
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default updateEmployee;
