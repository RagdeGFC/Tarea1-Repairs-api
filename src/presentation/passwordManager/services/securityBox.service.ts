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

	// Endpoint #3 Listar Categorías
	static async getCategories(sort: string) {
		try {
			console.log('📌 Buscando categorías en la base de datos...');
			const repository = AppDataSource.getRepository(SecurityBox);

			let orderBy = {};
			if (sort === 'alphabetical') {
				orderBy = { name: 'ASC' };
			}

			const categories = await repository.find({ order: orderBy });

			// ✅ Verificar si `categories` está vacío o indefinido
			if (!categories || categories.length === 0) {
				console.error('❌ ERROR: No se encontraron categorías.');
				return [];
			}

			// ✅ Imprimir datos obtenidos antes de aplicar `.map()`
			console.log('✅ Categorías obtenidas:', categories);

			return categories.map((cat) => ({
				id: cat.id,
				name: cat.name,
				favorite: cat.favorite || false,
			}));
		} catch (error) {
			console.error('❌ ERROR en getCategories:', error);
			throw new Error('Error al obtener las categorías');
		}
	}

	//
	// Endpoint #4: Ver detalle de un baúl de contraseñas
	static async getSecurityBoxById(securityBoxId: string) {
		console.log(`📌 Buscando SecurityBox con ID: ${securityBoxId}`); // 🚀 Bandera

		const repository = AppDataSource.getRepository(SecurityBox);

		const securityBox = await repository.findOne({
			where: { id: securityBoxId },
			relations: ['user', 'credentials'], // ✅ Asegurar que trae credenciales
		});

		if (!securityBox) throw new Error('Security Box no encontrada');

		console.log(`📌 SecurityBox encontrada:`, securityBox); // 🚀 Bandera

		// ✅ 🚀 **Solución: Asegurar que `credentials` es un array**
		const credentialsArray = Array.isArray(securityBox.credentials)
			? securityBox.credentials
			: [];

		return {
			id: securityBox.id,
			name: securityBox.name,
			passwords: credentialsArray.map((cred) => cred.password), //  `.map()` sobre array seguro
		};
	}
}
