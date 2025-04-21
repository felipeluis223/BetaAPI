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
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    // Verifique o token com o algoritmo correto (HS256)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
      algorithms: ["HS256"], // Certifique-se de especificar o algoritmo
    }) as JwtPayload;
    
    req.user = decoded; // Agora reconhecido corretamente com a interface `AuthRequest`
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }

    return res.status(403).json({ error: "Token inválido ou mal formado" });
  }
};
