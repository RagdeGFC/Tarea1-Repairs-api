import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserController } from '../passwordManager/controllers/user.controller';
import { UserService } from '../passwordManager/services/user.service';

const router = Router();
const userService = new UserService();
const controller = new UserController(userService);

router.post('/login', (req, res) => controller.loginUser(req, res));
router.post('/', (req, res) => controller.createUser(req, res));

router.use(AuthMiddleware.protect);

router.get('/', (req, res) => controller.findAllUsers(req, res));
router.get('/:id', (req, res) => controller.findOneUser(req, res));
router.patch('/:id', (req, res) => controller.updateUser(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));

export default router;
