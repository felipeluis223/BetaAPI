import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/User";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Usuário ou senha incorretos. Tente novamente." });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET as string, {
      expiresIn: "1h", 
    });

    res.json({ token });
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor. Aguarde um momento e tente novamente." });
  }
};
