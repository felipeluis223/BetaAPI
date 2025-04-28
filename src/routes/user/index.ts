import { Router } from 'express';
import createUser from '../../controller/user/create';
import { authenticate } from '../../auth/authMiddleware';
import getUsers from '../../controller/user/getAll';
import updateUser from '../../controller/user/update';

const router = Router();

// Rotas protegidas:
router.post('/', async (req, res) => {
    await createUser(req, res);
});

router.get('/', authenticate, async (req, res) => {
    await getUsers(req, res);
});

router.put('/', authenticate, async(req, res) =>{
    await updateUser(req, res);
});

router.delete('/', authenticate, async(req, res)=>{

});

export default router;
