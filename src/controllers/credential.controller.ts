import { Request, Response } from 'express';
import { CredentialService } from '../services/credential.service';

export class CredentialController {
	// Add a new credential
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

			console.log('✅ Credential successfully added.');
			res.status(201).json(newCredential);
		} catch (error: any) {
			console.error('❌ Error adding credential:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Get all credentials for a user
	static async getCredentials(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.user.id;
			const additionalParam =
				req.query.additionalParam || req.body.additionalParam;
			const credentials = await CredentialService.getCredentials(
				userId,
				additionalParam,
			);

			console.log('✅ Credentials successfully retrieved.');
			res.status(200).json(credentials);
		} catch (error: any) {
			console.error('❌ Error retrieving credentials:', error);
			res.status(400).json({ message: '❌ Could not retrieve credentials' });
		}
	}

	// Update an existing credential
	static async updateCredential(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.user.id;
			const { credentialId, pin, newData } = req.body;

			if (!credentialId || !pin || !newData) {
				console.error('❌ Missing required fields for updating credential.');
				res.status(400).json({ message: '❌ Missing required fields' });
				return;
			}

			const response = await CredentialService.updateCredential(
				userId,
				credentialId,
				pin,
				newData,
			);

			console.log('✅ Credential successfully updated.');
			res.status(200).json(response);
		} catch (error: any) {
			console.error('❌ Error updating credential:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Delete a credential
	static async deleteCredential(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.user.id;
			const { credentialId, pin } = req.body;

			if (!credentialId || !pin) {
				console.error('❌ Missing required fields for deleting credential.');
				res.status(400).json({ message: '❌ Missing required fields' });
				return;
			}

			const response = await CredentialService.deleteCredential(
				userId,
				credentialId,
				pin,
			);

			console.log('✅ Credential successfully deleted.');
			res.status(200).json(response);
		} catch (error: any) {
			console.error('❌ Error deleting credential:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}
}
