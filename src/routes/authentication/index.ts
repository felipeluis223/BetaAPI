import { Router } from "express";
import { login } from "../../auth/authController";

// Autenticação de login - público:
const router = Router();

router.post("/", async (req, res) => {
    await login(req, res);
});

export default router;
