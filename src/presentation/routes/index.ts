import { Router } from 'express';
// import authRoutes from '../passwordManager/routes/auth.routes';
import userRoutes from '../passwordManager/routes/user.routes';
import authRoutes from './auth.routes';

const router = Router();

// ✅ Registrar rutas correctamente
router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);

// ✅ Exportar correctamente el router
export default router;
