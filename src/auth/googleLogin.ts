import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../database/models/User";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    console.log("Acesso negado: token não informado.");
    res.status(400).json({ error: "Acesso negado: token não informado." });
    return;
  }

  try {
    // Verificar token com da Google:
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(401).json({ error: "Erro de autenticação: token inválido ou e-mail não encontrado." });
      return;
    }

    const { email, name } = payload;
    let user = await User.findOne({ where: { email } });

    // Caso o usuário não exista, cria um novo registro:
    if (!user) {
      user = await User.create({ email, name });
    }

    // Gerar token JWT:
    const jwtToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    
    // Retorna o token juntamente com as informações do usuário:
    res.json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    res.status(200);

  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado..." });
  }
};
