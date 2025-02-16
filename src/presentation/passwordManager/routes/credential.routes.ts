import { Router, Request, Response, NextFunction } from 'express';
import { CredentialController } from '../controllers/credential.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await CredentialController.addCredential(req, res);
	},
);

router.post(
	'/get',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await CredentialController.getCredentials(req, res);
	},
);

router.put(
	'/update',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await CredentialController.updateCredential(req, res);
	},
);

router.delete(
	'/delete',
	(req: Request, res: Response, next: NextFunction) => {
		AuthMiddleware.protect(req as any, res, next);
	},
	async (req: Request, res: Response) => {
		await CredentialController.deleteCredential(req, res);
	},
);

export default router;
