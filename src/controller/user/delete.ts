import { Request, Response } from 'express';
import User from '../../database/models/User';

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        // Se o parâmetro ID não estiver presente:
        if (!id) {
            return res.status(400).json({ message: "ID do usuário é obrigatório." });
        }

        // Buscar o usuário no banco pelo ID:
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(204).send();
        }
        
        // Exclui o usuário da base de dados:
        await user.destroy();

        return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default deleteUser;
