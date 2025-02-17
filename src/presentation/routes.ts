import { Router } from 'express';
import userRoutes from './passwordManager/routes/user.routes';
import authRoutes from './routes/auth.routes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);

console.log('📌 Rutas registradas en routes.ts:');
router.stack.forEach((r) =>
	console.log(r.route?.path || 'Middleware sin ruta'),
);

export default router;
