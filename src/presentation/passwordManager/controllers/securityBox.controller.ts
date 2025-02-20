import 'src/types/express';
import { Request, Response } from 'express';
import { SecurityBoxService } from '../services/securityBox.service';

export class SecurityBoxController {
	// Endpoint #1
	static async createSecurityBox(req: Request, res: Response) {
		try {
			const userId = req.user?.id;
			if (!userId) {
				return res.status(401).json({ message: 'Usuario no autenticado' });
			}
			const { name, favorite, icon } = req.body;
			const securityBox = await SecurityBoxService.createSecurityBox(
				userId,
				name,
				favorite,
				icon,
			);
			return res.status(201).json(securityBox);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
	// Endpoint #2
	static async getSecurityBoxes(req: Request, res: Response) {
		try {
			const userId = req.user?.id;
			if (!userId) {
				return res.status(401).json({ message: 'Usuario no autenticado' });
			}
			const securityBoxes = await SecurityBoxService.getSecurityBoxes(userId);
			return res.status(200).json(securityBoxes);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
	// Endpoint #3 Listar Categorías
	static async getCategories(req: Request, res: Response) {
		try {
			const categories = await SecurityBoxService.getCategories();
			return res.status(200).json(categories);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}

	// Endpoint #4: Ver detalle de un baúl de contraseñas
}
