import { AppDataSource } from '../config/ormconfig';
import { SecurityBox } from '../entities/SecurityBox';
import { User } from '../entities/User';

export class SecurityBoxService {
	static async createSecurityBox(
		userId: string,
		name: string,
		favorite: boolean,
		icon: string,
	) {
		const userRepository = AppDataSource.getRepository(User);
		const securityBoxRepository = AppDataSource.getRepository(SecurityBox);

		const user = await userRepository.findOne({ where: { id: userId } });
		if (!user) throw new Error('Usuario no encontrado');

		const newSecurityBox = securityBoxRepository.create({
			name,
			favorite,
			icon,
			user,
		});
		await securityBoxRepository.save(newSecurityBox);

		return newSecurityBox;
	}

	static async getSecurityBoxes(userId: string) {
		const securityBoxRepository = AppDataSource.getRepository(SecurityBox);
		return await securityBoxRepository.find({
			where: { user: { id: userId } },
		});
	}
}
