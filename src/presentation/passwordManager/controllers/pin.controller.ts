import 'src/types/express';
import { Request, Response } from 'express';
import { PinService } from '../services/pin.service';

export class PinController {
	static async validatePin(req: Request, res: Response) {
		try {
			const { userId, code } = req.body;
			const response = await PinService.validatePin(userId, code);
			res.status(200).json(response);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}
