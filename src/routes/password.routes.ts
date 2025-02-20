import { Request, Response, Router } from 'express';
import { PasswordController } from '../controllers/password.controller';

const router = Router();

router.post('/save', async (req: Request, res: Response) => {
	try {
		const result = await PasswordController.savePassword(req, res);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/list', async (req: Request, res: Response) => {
	try {
		const result = await PasswordController.getPasswords(req, res);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
