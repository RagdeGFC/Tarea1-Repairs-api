import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const userService = new UserService();
const controller = new UserController(userService);

// Rutas del gestor de contraseñas
router.post('/login', controller.loginUser);
router.post('/register', controller.createUser);
router.use(AuthMiddleware.protect); // Middleware de autenticación

// Endpoints principales
router.get('/', controller.findAllUsers);
router.get('/:id', controller.findOneUser);
router.patch('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;
