import 'src/types/express';
import { Request, Response } from 'express';
import { CredentialService } from '../services/credential.service';

export class CredentialController {
	//
	static async addCredential(req: Request, res: Response): Promise<Response> {
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
			return res.status(201).json(newCredential);
		} catch (error: any) {
			return res.status(500).json({ message: error.message });
		}
	}
	//
	static async getCredentials(req: Request, res: Response): Promise<Response> {
		try {
			const userId = req.user?.id;
			if (!userId) {
				return res.status(401).json({ message: 'Usuario no autenticado' });
			}
			const additionalParam =
				req.query.additionalParam || req.body.additionalParam;
			const credentials = await CredentialService.getCredentials(
				userId,
				additionalParam,
			);
			return res.status(200).json(credentials);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
	//
	static async updateCredential(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const userId = req.user?.id;
			if (!userId) {
				return res.status(401).json({ message: 'Usuario no autenticado' });
			}
			const { credentialId, pin, newData } = req.body;

			if (!credentialId || !pin || !newData) {
				return res.status(400).json({ message: 'Faltan datos requeridos' });
			}

			const response = await CredentialService.updateCredential(
				userId,
				credentialId,
				pin,
				newData,
			);
			return res.status(200).json(response);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
	//
	static async deleteCredential(
		req: Request,
		res: Response,
	): Promise<Response> {
		try {
			const userId = req.user?.id;
			if (!userId) {
				return res.status(401).json({ message: 'Usuario no autenticado' });
			}
			const { credentialId, pin } = req.body;

			if (!credentialId || !pin) {
				return res.status(400).json({ message: 'Faltan datos requeridos' });
			}

			const response = await CredentialService.deleteCredential(
				userId,
				credentialId,
				pin,
			);
			return res.status(200).json(response);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
