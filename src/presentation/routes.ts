//? Estos archivos no estan enviando informacion:
import authRoutes from './passwordManager/routes/auth.routes';
import userRoutes from './passwordManager/routes/user.routes';
import securityBoxRoutes from './passwordManager/routes/securityBox.routes';
import credentialRoutes from './passwordManager/routes/credential.routes';
import passwordRoutes from './passwordManager/routes/password.routes';
import pinRoutes from './passwordManager/routes/pin.routes';
//? ************************************************************************
import { Router } from 'express';

const router = Router();

console.log('📌 Cargando routes.ts...');

router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/security_box', securityBoxRoutes);
router.use('/api/credential_storage', credentialRoutes);
router.use('/api/passwords', passwordRoutes);
router.use('/api/pins', pinRoutes);

// ✅ Confirmar que las rutas están registradas
console.log('📌 Rutas registradas en Express:', router.stack);

export default router;
