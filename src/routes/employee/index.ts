import { Router } from 'express';
import { authenticate } from '../../auth/authMiddleware';
import getEmployee from '../../controller/employee/getAll';
import createEmployee from '../../controller/employee/create';

const router = Router();

// Rotas protegidas:
router.post("/employees", authenticate, async (req, res) => {
    await createEmployee(req, res);
});

router.get("/employees", authenticate, async (req, res) => {
    await getEmployee(req, res);
});


export default router;
