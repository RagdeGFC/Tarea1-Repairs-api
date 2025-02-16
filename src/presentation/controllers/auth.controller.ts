import { Request, Response } from 'express';
import { AuthService } from '../../domain/services/auth.service';

export class AuthController {
	static async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const token = await AuthService.login(email, password);
			res.json({ message: 'Login successful', token });
		} catch (error) {
			// Verificamos si el error es una instancia de Error antes de acceder a .message
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error';
			res.status(401).json({ error: errorMessage });
		}
	}
}
