import { Router } from 'express';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userService = new UserService();
const controller = new UserController(userService);

// ✅ Definir rutas correctamente
router.post('/register', (req, res) => controller.createUser(req, res));
router.post('/login', (req, res) => controller.loginUser(req, res));
router.get('/', (req, res) => controller.findAllUsers(req, res));
router.get('/:id', (req, res) => controller.findOneUser(req, res));
router.patch('/:id', (req, res) => controller.updateUser(req, res));
router.delete('/:id', (req, res) => controller.deleteUser(req, res));

// ✅ Exportar correctamente el router
export default router;
