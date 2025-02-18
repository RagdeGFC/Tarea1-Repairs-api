import { SecurityBox } from '../../../data/postgres/models/securityBox.model';
import { User } from '../../../data/postgres/models/user.model';
import { AppDataSource } from '../../../data/postgres/postgres-database';
import { Category } from '../../../data/postgres/models/category.model';

export class SecurityBoxService {
	//Endpoint #1
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
	//Endpoint #2
	static async getSecurityBoxes(userId: string) {
		const securityBoxRepository = AppDataSource.getRepository(SecurityBox);
		return await securityBoxRepository.find({
			where: { user: { id: userId } },
		});
	}

	// Endpoint #3 Listar Categorías
	static async getCategories() {
		const categoryRepository = AppDataSource.getRepository(Category);
		const categories = await categoryRepository.find();
		return categories;
	}

	// Endpoint #4
}
