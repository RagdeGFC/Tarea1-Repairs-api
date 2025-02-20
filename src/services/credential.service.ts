import crypto from 'crypto';
import { CredentialStorage } from '../entities/credential.storage';
import { SecurityBox } from '../entities/securityBox';
import { User } from '../entities/user';
import { UserService } from './user.service';
import { AppDataSource } from '../app';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'mySecretKey123456';
const IV_LENGTH = 16;

// Encrypt text
function encrypt(text: string): string {
	const iv = crypto.randomBytes(IV_LENGTH);
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		Buffer.from(ENCRYPTION_KEY),
		iv,
	);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt text
function decrypt(text: string): string {
	const textParts = text.split(':');
	const iv = Buffer.from(textParts[0], 'hex');
	const encryptedText = Buffer.from(textParts[1], 'hex');
	const decipher = crypto.createDecipheriv(
		'aes-256-cbc',
		Buffer.from(ENCRYPTION_KEY),
		iv,
	);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

export class CredentialService {
	// Retrieve credentials
	static async getCredentials(userId: string, pin: string) {
		const credentialRepository = AppDataSource.getRepository(CredentialStorage);

		const isValidPin = await UserService.validateSecurityPin(userId, pin);
		if (!isValidPin) {
			console.error('❌ Incorrect security PIN.');
			throw new Error('❌ Incorrect security PIN');
		}

		const credentials = await credentialRepository.find({
			where: { securityBox: { user: { id: userId } } },
		});

		console.log('✅ Credentials successfully retrieved.');
		return credentials.map((cred) => ({
			...cred,
			password: decrypt(cred.password),
		}));
	}

	// Add a new credential
	static async addCredential(
		userId: string,
		securityBoxId: string,
		account: string,
		password: string,
		description?: string,
		code_1?: string,
		code_2?: string,
	) {
		const userRepository = AppDataSource.getRepository(User);
		const securityBoxRepository = AppDataSource.getRepository(SecurityBox);
		const credentialRepository = AppDataSource.getRepository(CredentialStorage);

		const user = await userRepository.findOne({ where: { id: userId } });
		if (!user) {
			console.error('❌ User not found.');
			throw new Error('❌ User not found');
		}

		const securityBox = await securityBoxRepository.findOne({
			where: { id: securityBoxId, user: { id: userId } },
		});
		if (!securityBox) {
			console.error('❌ Security Box not found.');
			throw new Error('❌ Security Box not found');
		}

		const encryptedPassword = encrypt(password);
		const newCredential = credentialRepository.create({
			account,
			password: encryptedPassword,
			description,
			code_1,
			code_2,
			securityBox,
		});

		await credentialRepository.save(newCredential);
		console.log('✅ Credential successfully added.');
		return newCredential;
	}

	// Update an existing credential
	static async updateCredential(
		userId: string,
		credentialId: string,
		pin: string,
		newData: Partial<CredentialStorage>,
	) {
		const credentialRepository = AppDataSource.getRepository(CredentialStorage);

		const isValidPin = await UserService.validateSecurityPin(userId, pin);
		if (!isValidPin) {
			console.error('❌ Incorrect security PIN.');
			throw new Error('❌ Incorrect security PIN');
		}

		const credential = await credentialRepository.findOne({
			where: { id: credentialId, securityBox: { user: { id: userId } } },
		});
		if (!credential) {
			console.error('❌ Credential not found.');
			throw new Error('❌ Credential not found');
		}

		if (newData.service) credential.service = newData.service;
		if (newData.username) credential.username = newData.username;
		if (newData.password) credential.password = encrypt(newData.password);

		await credentialRepository.save(credential);
		console.log('✅ Credential successfully updated.');
		return { message: '✅ Credential successfully updated' };
	}

	// Delete a credential
	static async deleteCredential(
		userId: string,
		credentialId: string,
		pin: string,
	) {
		const credentialRepository = AppDataSource.getRepository(CredentialStorage);

		const isValidPin = await UserService.validateSecurityPin(userId, pin);
		if (!isValidPin) {
			console.error('❌ Incorrect security PIN.');
			throw new Error('❌ Incorrect security PIN');
		}

		const credential = await credentialRepository.findOne({
			where: { id: credentialId, securityBox: { user: { id: userId } } },
		});
		if (!credential) {
			console.error('❌ Credential not found.');
			throw new Error('❌ Credential not found');
		}

		await credentialRepository.remove(credential);
		console.log('✅ Credential successfully deleted.');
		return { message: '✅ Credential successfully deleted' };
	}
}
