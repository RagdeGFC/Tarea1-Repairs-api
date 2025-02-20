import { Router, Request, Response } from 'express';
import { CredentialController } from '../controllers/credential.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(AuthMiddleware.protect);

router.post('/api/credential_storage', async (req: Request, res: Response) => {
	await CredentialController.addCredential(req, res);
});

router.post(
	'/api/credential_storage/get',
	async (req: Request, res: Response) => {
		await CredentialController.getCredentials(req, res);
	},
);

router.put(
	'/api/credential_storage/update',
	async (req: Request, res: Response) => {
		await CredentialController.updateCredential(req, res);
	},
);

router.delete(
	'/api/credential_storage/delete',
	async (req: Request, res: Response) => {
		await CredentialController.deleteCredential(req, res);
	},
);

export default router;
