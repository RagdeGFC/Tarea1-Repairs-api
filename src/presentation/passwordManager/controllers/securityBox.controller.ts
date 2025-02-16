import { Request, Response } from 'express';
import { SecurityBoxService } from '../services/securityBox.service';

export class SecurityBoxController {
	static async createSecurityBox(req: Request, res: Response) {
		try {
			const userId = req.user.id;
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

	static async getSecurityBoxes(req: Request, res: Response) {
		try {
			const userId = req.user.id;
			const securityBoxes = await SecurityBoxService.getSecurityBoxes(userId);
			return res.status(200).json(securityBoxes);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
