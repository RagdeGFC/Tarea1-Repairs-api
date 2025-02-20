import { Router } from 'express';
import authRoutes from './auth.routes';
import credentialRoutes from './credential.routes';
import passwordRoutes from './password.routes';
import pinRoutes from './pin.routes';
import securityBoxRoutes from './securityBox.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/credentials', credentialRoutes);
router.use('/api/passwords', passwordRoutes);
router.use('/api/pins', pinRoutes);
router.use('/api/security-box', securityBoxRoutes);
router.use('/api/users', userRoutes);

export default router;
