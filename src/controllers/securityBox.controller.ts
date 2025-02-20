import { SecurityBoxService } from '../services/securityBox.service';
import { Response, Request } from 'express';

export class SecurityBoxController {
	// Create a new security box
	static async createSecurityBox(req: Request, res: Response) {
		try {
			const userId = req.user.id;
			const { name, favorite, icon } = req.body;

			if (!name || favorite === undefined || !icon) {
				console.error('❌ Missing required fields for creating security box.');
				return res.status(400).json({ message: '❌ All fields are required' });
			}

			const securityBox = await SecurityBoxService.createSecurityBox(
				userId,
				name,
				favorite,
				icon,
			);

			console.log('✅ Security box successfully created.');
			return res.status(201).json(securityBox);
		} catch (error: any) {
			console.error('❌ Error creating security box:', error);
			return res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Retrieve all security boxes for a user
	static async getSecurityBoxes(req: Request, res: Response) {
		try {
			const userId = req.user.id;
			const securityBoxes = await SecurityBoxService.getSecurityBoxes(userId);

			console.log('✅ Security boxes successfully retrieved.');
			return res.status(200).json(securityBoxes);
		} catch (error: any) {
			console.error('❌ Error retrieving security boxes:', error);
			return res.status(500).json({ message: '❌ Unknown error' });
		}
	}
}
