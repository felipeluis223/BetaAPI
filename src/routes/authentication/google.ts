import { Router } from "express";
import { googleLogin } from "../../auth/googleLogin";

// Autenticação de login - Google:
const router = Router();
router.post("/", googleLogin);

export default router;
