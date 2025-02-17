import { Password } from '../../../data/postgres/models/password.model';
import { User } from '../../../data/postgres/models/user.model';
import { AppDataSource } from '../../../data/postgres/postgres-database';
import { encryptPassword, decryptPassword } from '../utils/encryption';

export class PasswordService {
	static async savePassword(userId: number, service: string, password: string) {
		const passwordRepository = AppDataSource.getRepository(Password);
		const userRepository = AppDataSource.getRepository(User);

		const user = await userRepository.findOne({
			where: { id: userId.toString() },
		});
		if (!user) throw new Error('Usuario no encontrado');

		const newPassword = new Password();
		newPassword.user = user;
		newPassword.service = service;
		newPassword.encryptedPassword = encryptPassword(password);

		await passwordRepository.save(newPassword);
		return { message: 'Contraseña guardada exitosamente' };
	}

	static async getPasswords(userId: number) {
		const passwordRepository = AppDataSource.getRepository(Password);
		const passwords = await passwordRepository.find({
			where: { user: { id: userId.toString() } },
		});

		return passwords.map((pwd) => ({
			service: pwd.service,
			password: decryptPassword(pwd.encryptedPassword),
		}));
	}
}
