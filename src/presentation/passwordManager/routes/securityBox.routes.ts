import { NextFunction, Request, Response, Router } from 'express';
import { SecurityBoxController } from '../controllers/securityBox.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

//bandera
console.log('📌 Cargando securityBox.routes.ts...');

// Endpoint #1
router.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await SecurityBoxController.createSecurityBox(req, res);
	},
);
// Endpoint #2
router.get(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await SecurityBoxController.getSecurityBoxes(req, res);
	},
);

// Endpoint #3 Listar Categorías
router.get(
	'/categories',
	AuthMiddleware.protect,
	SecurityBoxController.getCategories,
);

//bandera
console.log('📌 Ruta /categories registrada correctamente.');

// Endpoint #4

export default router;
