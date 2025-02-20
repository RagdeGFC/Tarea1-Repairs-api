import { Response, Request } from 'express';

export class AuthController {
	// Register a new user
	static async register(req: Request, res: Response): Promise<void> {
		try {
			console.log('✅ User successfully registered.');
			res.status(201).json({ message: '✅ User successfully registered' });
		} catch (error: any) {
			console.error('❌ Error registering user:', error);
			res.status(500).json({ error: '❌ Unknown error' });
		}
	}

	// Log in a user
	static async login(req: Request, res: Response): Promise<void> {
		try {
			console.log('✅ Login successful.');
			res.status(200).json({ message: '✅ Login successful' });
		} catch (error: any) {
			console.error('❌ Error logging in:', error);
			res.status(500).json({ error: '❌ Unknown error' });
		}
	}
}
