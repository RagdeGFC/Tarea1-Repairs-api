import { Request, Response } from 'express';
import { CredentialService } from '../services/credential.service';
import { Pin } from '../../data/postgres/models/pin/pin.model';
import '../../types/express';

//... resto del código...

export class CredentialController {
	static async addCredential(req: Request, res: Response): Promise<void> {
		try {
			const {
				userId,
				securityBoxId,
				account,
				password,
				description,
				code_1,
				code_2,
			} = req.body;
			const newCredential = await CredentialService.addCredential(
				userId,
				securityBoxId,
				account,
				password,
				description,
				code_1,
				code_2,
			);
			res.status(201).json(newCredential);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}

	static async getCredentials(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.user.id;
			const additionalParam =
				req.query.additionalParam || req.body.additionalParam;
			const credentials = await CredentialService.getCredentials(
				userId,
				additionalParam,
			);
			res.status(200).json(credentials);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async updateCredential(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.user.id;
			const { credentialId, pin, newData } = req.body;

			if (!credentialId || !pin || !newData) {
				res.status(400).json({ message: 'Faltan datos requeridos' });
				return;
			}

			const response = await CredentialService.updateCredential(
				userId,
				credentialId,
				pin,
				newData,
			);
			res.status(200).json(response);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async deleteCredential(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.user.id;
			const { credentialId, pin } = req.body;

			if (!credentialId || !pin) {
				res.status(400).json({ message: 'Faltan datos requeridos' });
				return;
			}

			const response = await CredentialService.deleteCredential(
				userId,
				credentialId,
				pin,
			);
			res.status(200).json(response);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}
