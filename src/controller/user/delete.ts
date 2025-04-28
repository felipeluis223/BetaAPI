import { Request, Response } from 'express';
import User from '../../database/models/User';

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID do usuário é obrigatório." });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        await user.destroy(); // Deleta o usuário do banco.

        return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default deleteUser;
