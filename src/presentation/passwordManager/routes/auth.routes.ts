import { Request, Response } from 'express';

export class AuthController {
	static async register(req: Request, res: Response): Promise<void> {
		try {
			res.status(201).json({ message: 'Usuario registrado con éxito' });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	static async login(req: Request, res: Response): Promise<void> {
		try {
			res.status(200).json({ message: 'Inicio de sesión exitoso' });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
