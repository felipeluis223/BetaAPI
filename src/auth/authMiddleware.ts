import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Interface estendendo apenas para este arquivo:
interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization?.split(" ")[1]; // Captura "Bearer TOKEN".

    if (!token) {
      // Envia a resposta de erro e interrompe a execução do middleware:
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      // Verifique o token com o algoritmo correto (HS256):
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
        algorithms: ["HS256"], // Certifique-se de especificar o algoritmo:
      }) as JwtPayload;
      
      req.user = decoded; // Armazena os dados decodificados no objeto `req`.
      next(); // Chama o próximo middleware ou a rota.
      resolve(); // Resolve a Promise quando o processo for concluído.
    } catch (error) {
      console.error("Erro ao verificar token:", error);

      if (error instanceof jwt.TokenExpiredError) {
        // Envia resposta de erro caso o token tenha expirado:
        return res.status(401).json({ error: "Token expirado" });
      }

      // Envia resposta de erro caso o token seja inválido ou mal formado:
      return res.status(403).json({ error: "Token inválido ou mal formado" });
    }
  });
};
