import { Router } from 'express';
import { authenticate } from '../../auth/authMiddleware';
import getEmployee from '../../controller/employee/getAll';
import createEmployee from '../../controller/employee/create';
import deleteEmployee from '../../controller/employee/delete';
import updateEmployee from '../../controller/employee/update';

const router = Router();

// Rotas protegidas:
router.post("/", authenticate, async (req, res) => {
    await createEmployee(req, res);
});

router.get("/", authenticate, async (req, res) => {
    await getEmployee(req, res);
});


router.put("/", authenticate, async (req, res) => {
    await updateEmployee(req, res);
});

router.delete("/:id", authenticate, async (req, res) => {
    await deleteEmployee(req, res);
});


export default router;
