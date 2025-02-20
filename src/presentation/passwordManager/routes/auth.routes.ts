import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

console.log('📌 Cargando auth.routes.ts...');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// ✅ Endpoint real faltante (Ejemplo: logout o refrescar token)
router.post('/logout', (req, res) => {
	// Aquí se podría invalidar el token si se usa un sistema de tokens en la base de datos
	return res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

// ✅ Endpoint de perfil corregido, ahora usando req.user si existe
router.get('/profile', (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: 'Usuario no autenticado' });
	}
	return res.json({ message: 'Perfil del usuario', user: req.user });
});

export default router;
