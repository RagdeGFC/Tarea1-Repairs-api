import { Router, Request, Response, NextFunction } from 'express';
import { SecurityBoxController } from '../controllers/securityBox.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

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

export default router;
