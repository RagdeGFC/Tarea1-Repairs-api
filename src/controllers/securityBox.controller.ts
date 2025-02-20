import { Request, Response } from 'express';
import { SecurityBoxService } from '../services/securityBox.service';

export class SecurityBoxController {
	static async createSecurityBox(req: Request, res: Response) {
		try {
			//
			const userId = req.user.id;
			const { name, favorite, icon } = req.body;

			// Llamada al servicio para crear un nuevo SecurityBox
			const securityBox = await SecurityBoxService.createSecurityBox(
				userId,
				name,
				favorite,
				icon,
			);

			// Respuesta al cliente con el nuevo SecurityBox
			return res.status(201).json(securityBox);
		} catch (error: any) {
			// En caso de error, se captura y responde con un mensaje adecuado
			return res.status(400).json({ message: error.message });
		}
	}

	static async getSecurityBoxes(req: Request, res: Response) {
		try {
			// Accediendo directamente a req.user.id
			const userId = req.user.id;

			// Llamada al servicio para obtener los SecurityBoxes del usuario
			const securityBoxes = await SecurityBoxService.getSecurityBoxes(userId);

			// Respuesta al cliente con los SecurityBoxes
			return res.status(200).json(securityBoxes);
		} catch (error: any) {
			// En caso de error, se captura y responde con un mensaje adecuado
			return res.status(400).json({ message: error.message });
		}
	}
}
