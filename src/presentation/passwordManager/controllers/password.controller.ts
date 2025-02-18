import { Request, Response } from 'express';
import { PasswordService } from '../services/password.service';

export class PasswordController {
	//
	static async savePassword(req: Request, res: Response) {
		try {
			const { userId, service, password } = req.body;
			if (!userId || !service || !password) {
				return res
					.status(400)
					.json({ message: 'Todos los campos son obligatorios' });
			}

			const response = await PasswordService.savePassword(
				userId,
				service,
				password,
			);
			return res.status(201).json(response);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
	//
	static async getPasswords(req: Request, res: Response) {
		try {
			const { userId } = req.query;
			if (!userId)
				return res
					.status(400)
					.json({ message: 'El ID del usuario es obligatorio' });

			const passwords = await PasswordService.getPasswords(Number(userId));
			return res.status(200).json({ passwords });
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
