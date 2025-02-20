import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';

export class AuthController {
	//Register a new user
	static async register(req: Request, res: Response): Promise<Response> {
		try {
			const { name, surname, email, cellphone, password } = req.body;

			// Register user
			const user = await AuthService.register(
				name,
				surname,
				email,
				cellphone,
				password,
			);

			console.log('✅ User successfully registered.');
			return res.status(201).json(user);
		} catch (error) {
			console.error('❌ Error in register:', error);
			return res.status(400).json({
				message: error instanceof Error ? error.message : '❌ Unknown error',
			});
		}
	}

	//Log in an existing user
	static async login(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;

			// Authenticate user
			const data = await AuthService.login(email, password);

			console.log('✅ User successfully logged in.');
			return res.status(200).json(data);
		} catch (error) {
			console.error('❌ Error in login:', error);
			return res.status(400).json({
				message: error instanceof Error ? error.message : '❌ Unknown error',
			});
		}
	}
}
