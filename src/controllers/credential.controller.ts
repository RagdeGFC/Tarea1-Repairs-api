import { Response } from 'express';
import { CredentialService } from '../services/credential.service';
import { AuthenticatedRequest } from '../types/express';

export class CredentialController {
	// ✅ Add Credential
	static async addCredential(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user) {
				console.error('❌ Unauthorized: No user ID found in request.');
				return res.status(401).json({ message: '❌ Unauthorized' });
			}

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

	// ✅ Get Credentials
	static async getCredentials(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user) {
				console.error('❌ Unauthorized: No user ID found in request.');
				return res.status(401).json({ message: '❌ Unauthorized' });
			}

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

	// ✅ Update Credential
	static async updateCredential(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user) {
				console.error('❌ Unauthorized: No user ID found in request.');
				return res.status(401).json({ message: '❌ Unauthorized' });
			}

			const userId = req.user.id;
			const { credentialId, pin, newData } = req.body;

			if (!credentialId || !pin || !newData) {
				res.status(400).json({ message: '❌ Missing required fields' });
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

	// ✅ Delete Credential
	static async deleteCredential(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user) {
				console.error('❌ Unauthorized: No user ID found in request.');
				return res.status(401).json({ message: '❌ Unauthorized' });
			}

			const userId = req.user.id;
			const { credentialId, pin } = req.body;

			if (!credentialId || !pin) {
				res.status(400).json({ message: '❌ Missing required fields' });
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
