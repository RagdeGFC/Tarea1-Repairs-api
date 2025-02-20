import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

// Rutas de autenticación
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;
