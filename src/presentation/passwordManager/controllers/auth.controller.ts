import 'src/types/express';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
console.log('📌 Cargando auth.controller.ts...');
export class AuthController {
	//
	static async register(req: Request, res: Response): Promise<Response> {
		try {
			const { name, surname, email, cellphone, password } = req.body;
			if (!name || !surname || !email || !cellphone || !password) {
				return res
					.status(400)
					.json({ message: 'Todos los campos son obligatorios' });
			}
			const user = await AuthService.register(
				name,
				surname,
				email,
				cellphone,
				password,
			);
			return res.status(201).json(user);
		} catch (error: any) {
			console.error('Error en register:', error);
			return res
				.status(500)
				.json({ message: error.message || 'Error interno del servidor' });
		}
	}
	//
	static async login(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return res
					.status(400)
					.json({ message: 'Email y contraseña son obligatorios' });
			}
			const data = await AuthService.login(email, password);
			return res.status(200).json(data);
		} catch (error: any) {
			console.error('Error en login:', error);
			return res
				.status(500)
				.json({ message: error.message || 'Error interno del servidor' });
		}
	}
}
