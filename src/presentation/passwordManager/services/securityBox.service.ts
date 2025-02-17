import { SecurityBox } from '../../../data/postgres/models/securityBox.model';
import { User } from '../../../data/postgres/models/user.model';
import { AppDataSource } from '../../../data/postgres/postgres-database';

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
