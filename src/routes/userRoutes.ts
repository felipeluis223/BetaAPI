// routes/userRoutes.ts
import { Router } from "express";
import createUser from "../controllers/user/create";
import getUsers from "../controllers/user/getAll";
// import { authenticate } from "../auth/authMiddleware";

const router = Router();

// As funções async funcionam normalmente aqui
// router.get("/", authenticate, getUsers);
// router.post("/", authenticate, createUser);


router.get("/", async (req, res)=>{
    await getUsers(req, res);
});

router.post("/", async (req, res) => {
    await createUser(req, res);  // Chama a função createUser passando os objetos req e res
});

export default router;
