import crypto from 'crypto';
import { UserService } from './user.service';
import { CredentialStorage } from '../../../data/postgres/models/credentialStorage.model';
import { AppDataSource } from '../../../data/postgres/postgres-database';
import { SecurityBox } from '../../../data/postgres/models/securityBox.model';
import { User } from '../../../data/postgres/models/user.model';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'mySecretKey123456';
const IV_LENGTH = 16;

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
	static async getCredentials(userId: string, pin: string) {
		const credentialRepository = AppDataSource.getRepository(CredentialStorage);

		const isValidPin = await UserService.validateSecurityPin(userId, pin);

		if (!isValidPin) throw new Error('PIN de seguridad incorrecto');

		const credentials = await credentialRepository.find({
			where: { securityBox: { user: { id: userId } } },
		});

		return credentials.map((cred) => ({
			...cred,
			password: decrypt(cred.password),
		}));
	}

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
		if (!user) throw new Error('Usuario no encontrado');

		const securityBox = await securityBoxRepository.findOne({
			where: { id: securityBoxId, user: { id: userId } },
		});
		if (!securityBox) throw new Error('Security Box no encontrada');

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
		return newCredential;
	}

	static async updateCredential(
		userId: string,
		credentialId: string,
		pin: string,
		newData: Partial<CredentialStorage>,
	) {
		const credentialRepository = AppDataSource.getRepository(CredentialStorage);

		const isValidPin = await UserService.validateSecurityPin(userId, pin);
		if (!isValidPin) throw new Error('PIN de seguridad incorrecto');

		const credential = await credentialRepository.findOne({
			where: { id: credentialId, securityBox: { user: { id: userId } } },
		});

		if (!credential) throw new Error('Credencial no encontrada');

		if (newData.service) credential.service = newData.service;
		if (newData.username) credential.username = newData.username;
		if (newData.password) credential.password = encrypt(newData.password);

		await credentialRepository.save(credential);
		return { message: 'Credencial actualizada con éxito' };
	}

	static async deleteCredential(
		userId: string,
		credentialId: string,
		pin: string,
	) {
		const credentialRepository = AppDataSource.getRepository(CredentialStorage);

		const isValidPin = await UserService.validateSecurityPin(userId, pin);
		if (!isValidPin) throw new Error('PIN de seguridad incorrecto');

		const credential = await credentialRepository.findOne({
			where: { id: credentialId, securityBox: { user: { id: userId } } },
		});

		if (!credential) throw new Error('Credencial no encontrada');

		await credentialRepository.remove(credential);
		return { message: 'Credencial eliminada con éxito' };
	}
}
