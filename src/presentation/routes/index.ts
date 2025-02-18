import { Router } from 'express';
import userRoutes from '../passwordManager/routes/user.routes'; //Endpoint#2
import authRoutes from '../passwordManager/routes/auth.routes'; // Endpoint #1
import securityBoxRoutes from '../passwordManager/routes/securityBox.routes';
const router = Router();

// Registrar rutas
router.use('/api/auth', authRoutes); // Endpoint #1 login de usuario
router.use('/api/user', userRoutes); //Endpoint #2 Crear usuario
router.use('/api/security_box', securityBoxRoutes); // Endpoint #3

// Exportar el router
export default router;
