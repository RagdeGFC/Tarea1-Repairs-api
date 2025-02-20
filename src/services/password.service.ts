import { encryptPassword, decryptPassword } from '../utils/encryption';
import { User } from '../entities/user';
import { AppDataSource } from '../app';
import { Password } from '../entities/password';

export class PasswordService {
	// Save a new password
	static async savePassword(userId: number, service: string, password: string) {
		const passwordRepository = AppDataSource.getRepository(Password);
		const userRepository = AppDataSource.getRepository(User);

		const user = await userRepository.findOne({
			where: { id: userId.toString() },
		});
		if (!user) {
			console.error('❌ User not found.');
			throw new Error('❌ User not found');
		}

		const newPassword = new Password();
		newPassword.user = user;
		newPassword.service = service;
		newPassword.encryptedPassword = encryptPassword(password);

		await passwordRepository.save(newPassword);
		console.log('✅ Password successfully saved.');
		return { message: '✅ Password successfully saved' };
	}

	// Retrieve stored passwords
	static async getPasswords(userId: number) {
		const passwordRepository = AppDataSource.getRepository(Password);
		const passwords = await passwordRepository.find({
			where: { user: { id: userId.toString() } },
		});

		console.log('✅ Passwords successfully retrieved.');
		return passwords.map((pwd) => ({
			service: pwd.service,
			password: decryptPassword(pwd.encryptedPassword),
		}));
	}
}
