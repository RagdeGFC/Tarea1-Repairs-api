import { User } from '../entities/user';
import { SecurityBox } from '../entities/securityBox';
import { AppDataSource } from '../app';

export class SecurityBoxService {
	// Create a new security box
	static async createSecurityBox(
		userId: string,
		name: string,
		favorite: boolean,
		icon: string,
	) {
		const userRepository = AppDataSource.getRepository(User);
		const securityBoxRepository = AppDataSource.getRepository(SecurityBox);

		const user = await userRepository.findOne({ where: { id: userId } });
		if (!user) {
			console.error('❌ User not found.');
			throw new Error('❌ User not found');
		}

		const newSecurityBox = securityBoxRepository.create({
			name,
			favorite,
			icon,
			user,
		});
		await securityBoxRepository.save(newSecurityBox);

		console.log('✅ Security box successfully created.');
		return newSecurityBox;
	}

	// Retrieve all security boxes for a user
	static async getSecurityBoxes(userId: string) {
		const securityBoxRepository = AppDataSource.getRepository(SecurityBox);
		const securityBoxes = await securityBoxRepository.find({
			where: { user: { id: userId } },
		});

		console.log('✅ Security boxes successfully retrieved.');
		return securityBoxes;
	}
}
