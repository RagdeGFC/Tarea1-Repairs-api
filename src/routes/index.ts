import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import credentialRoutes from './credential.routes';
import passwordRoutes from './password.routes';
import securityBoxRoutes from './securityBox.routes';

const router = Router();

// Register routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/credentials', credentialRoutes);
router.use('/passwords', passwordRoutes);
router.use('/security-boxes', securityBoxRoutes);

export default router;
