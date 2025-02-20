import { CredentialController } from '../controllers/credential.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// Add a new credential
router.post(
	'/',
	(req: Request, res: Response, next: NextFunction) =>
		authMiddleware(req as any, res, next),
	async (req: Request, res: Response) => {
		console.log('✅ Adding new credential.');
		await CredentialController.addCredential(req, res);
	},
);

// Retrieve credentials
router.post(
	'/get',
	(req: Request, res: Response, next: NextFunction) =>
		authMiddleware(req as any, res, next),
	async (req: Request, res: Response) => {
		console.log('✅ Retrieving credentials.');
		await CredentialController.getCredentials(req, res);
	},
);

// Update a credential
router.put(
	'/update',
	(req: Request, res: Response, next: NextFunction) =>
		authMiddleware(req as any, res, next),
	async (req: Request, res: Response) => {
		console.log('✅ Updating credential.');
		await CredentialController.updateCredential(req, res);
	},
);

// Delete a credential
router.delete(
	'/delete',
	(req: Request, res: Response, next: NextFunction) =>
		authMiddleware(req as any, res, next),
	async (req: Request, res: Response) => {
		console.log('✅ Deleting credential.');
		await CredentialController.deleteCredential(req, res);
	},
);

export default router;
