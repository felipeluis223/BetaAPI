import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Interface estendendo apenas para este arquivo
interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Captura "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // Agora reconhecido corretamente com a interface `AuthRequest`
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res.status(403).json({ error: "Token inválido ou expirado" });
  }
};
