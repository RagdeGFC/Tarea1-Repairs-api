import { SecurityBoxController } from '../controllers/securityBox.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// Create a new security box
router.post(
	'/',
	(req: Request, res: Response, next: NextFunction) =>
		authMiddleware(req as any, res, next),
	async (req: Request, res: Response) => {
		console.log('✅ Creating security box.');
		await SecurityBoxController.createSecurityBox(req, res);
	},
);

// Retrieve all security boxes
router.get(
	'/',
	(req: Request, res: Response, next: NextFunction) =>
		authMiddleware(req as any, res, next),
	async (req: Request, res: Response) => {
		console.log('✅ Retrieving security boxes.');
		await SecurityBoxController.getSecurityBoxes(req, res);
	},
);

export default router;
