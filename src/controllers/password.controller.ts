import { PasswordService } from '../services/password.service';
import { Request, Response } from 'express';

export class PasswordController {
	// Save a new password
	static async savePassword(req: Request, res: Response) {
		try {
			const { userId, service, password } = req.body;

			if (!userId || !service || !password) {
				console.error('❌ Missing required fields for saving password.');
				return res.status(400).json({ message: '❌ All fields are required' });
			}

			const response = await PasswordService.savePassword(
				userId,
				service,
				password,
			);

			console.log('✅ Password successfully saved.');
			return res.status(201).json(response);
		} catch (error: any) {
			console.error('❌ Error saving password:', error);
			return res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Retrieve stored passwords
	static async getPasswords(req: Request, res: Response) {
		try {
			const { userId } = req.query;

			if (!userId) {
				console.error('❌ Missing user ID for retrieving passwords.');
				return res.status(400).json({ message: '❌ User ID is required' });
			}

			const passwords = await PasswordService.getPasswords(Number(userId));

			console.log('✅ Passwords successfully retrieved.');
			return res.status(200).json({ passwords });
		} catch (error: any) {
			console.error('❌ Error retrieving passwords:', error);
			return res.status(500).json({ message: '❌ Unknown error' });
		}
	}
}
