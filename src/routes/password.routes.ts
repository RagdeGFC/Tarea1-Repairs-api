import { PasswordController } from '../controllers/password.controller';
import { Router, Request, Response } from 'express';

const router = Router();

// Save a new password
router.post('/save', async (req: Request, res: Response) => {
	try {
		console.log('✅ Saving password.');
		await PasswordController.savePassword(req, res);
	} catch (error: any) {
		console.error('❌ Error saving password:', error);
		res.status(500).json({ error: '❌ Unknown error' });
	}
});

// Retrieve stored passwords
router.get('/list', async (req: Request, res: Response) => {
	try {
		console.log('✅ Retrieving password list.');
		await PasswordController.getPasswords(req, res);
	} catch (error: any) {
		console.error('❌ Error retrieving passwords:', error);
		res.status(500).json({ error: '❌ Unknown error' });
	}
});

export default router;
