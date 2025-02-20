import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
	// Register a new user
	static async register(req: Request, res: Response): Promise<void> {
		try {
			const { name, surname, email, cellphone, password } = req.body;
			if (!name || !surname || !email || !cellphone || !password) {
				res.status(400).json({ error: '❌ Missing required fields' });
				return;
			}

			const user = await AuthService.register(
				name,
				surname,
				email,
				cellphone,
				password,
			);
			console.log('✅ User successfully registered:', user);
			res
				.status(201)
				.json({ message: '✅ User successfully registered', user });
		} catch (error: any) {
			console.error('❌ Error registering user:', error);
			res.status(500).json({
				message: '❌ Internal Server Error',
				error: error.message || error,
			});
		}
	}

	// Log in a user
	static async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				res.status(400).json({ error: '❌ Missing email or password' });
				return;
			}

			const data = await AuthService.login(email, password);
			console.log('✅ Login successful:', data);
			res.status(200).json(data);
		} catch (error: any) {
			console.error('❌ Error logging in:', error);
			res.status(500).json({ error: '❌ Unknown error' });
		}
	}
}
