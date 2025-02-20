import { Router, Request, Response } from 'express';
import { SecurityBoxController } from '../controllers/securityBox.controller';
import { AuthMiddleware } from '../config/auth.middleware';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(AuthMiddleware.protect);

router.post('/', async (req: Request, res: Response) => {
	await SecurityBoxController.createSecurityBox(req, res);
});

router.get('/', async (req: Request, res: Response) => {
	await SecurityBoxController.getSecurityBoxes(req, res);
});

export default router;
