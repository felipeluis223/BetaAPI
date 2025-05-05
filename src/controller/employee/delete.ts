import { Request, Response } from 'express';
import Employee from '../../database/models/Employee';

const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Se o parâmetro ID não estiver presente:
        if (!id) {
            return res.status(400).json({ message: "ID do funcionário é obrigatório." });
        }

        // Buscar o usuário no banco pelo ID:
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(204).send();
        }
        
        // Exclui o usuário da base de dados:
        await employee.destroy();

        return res.status(200).json({ message: "Funcionário deletado com sucesso." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default deleteEmployee;
