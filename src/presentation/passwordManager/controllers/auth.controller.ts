import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
	static async register(req: Request, res: Response): Promise<Response> {
		try {
			const { name, surname, email, cellphone, password } = req.body;
			const user = await AuthService.register(
				name,
				surname,
				email,
				cellphone,
				password,
			);
			return res.status(201).json(user);
		} catch (error) {
			console.error('Error en register:', error);
			return res.status(400).json({
				message: error instanceof Error ? error.message : 'Error desconocido',
			});
		}
	}

	static async login(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;
			const data = await AuthService.login(email, password);
			return res.status(200).json(data);
		} catch (error) {
			console.error('Error en login:', error);
			return res.status(400).json({
				message: error instanceof Error ? error.message : 'Error desconocido',
			});
		}
	}
}
