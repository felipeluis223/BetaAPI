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
    console.log("Token não fornecido");
    res.status(400).json({ error: "Token não fornecido" });
    return;
  }

  try {
    // Verifica o token com o Google:
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Payload do Google:", payload);

    if (!payload || !payload.email) {
      console.log("Token inválido ou sem email");
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const { email, name } = payload;
    let user = await User.findOne({ where: { email } });

    // Se o usuário não for encontrado, cria um novo:
    if (!user) {
      user = await User.create({ email, name });
      console.log("Usuário criado no banco:", user);
    }

    // Gera o token JWT:
    const jwtToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Retorna o token + dados do usuário:
    res.json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Erro ao verificar o token do Google:", err);
    res.status(401).json({ error: "Token inválido ou expirado..." });
  }
};
