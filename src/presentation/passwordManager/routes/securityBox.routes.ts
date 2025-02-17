import { Router, Request, Response, NextFunction } from 'express';
import { SecurityBoxController } from '../controllers/securityBox.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

console.log('📌 Cargando securityBox.routes.ts...');

router.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await SecurityBoxController.createSecurityBox(req, res);
	},
);

router.get(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await SecurityBoxController.getSecurityBoxes(req, res);
	},
);

// 📌 Endpoint #3 Listar Categorías
router.get(
	'/categories',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		console.log('📌 Ejecutando SecurityBoxController.getCategories...');
		await SecurityBoxController.getCategories(req, res);
	},
);
// bandera
console.log('✅ securityBox.routes.ts se ha cargado correctamente.');

// Endpoint #4: Ver detalle de un baúl de contraseñas
router.get('/:securityBoxId', SecurityBoxController.getSecurityBoxById);

export default router;
