import { Router } from 'express';
import userRoutes from './passwordManager/routes/user.routes';
import authRoutes from './passwordManager/routes/auth.routes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);

export default router;
