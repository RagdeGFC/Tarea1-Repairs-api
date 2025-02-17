import { DataSource } from 'typeorm';
import { SecurityBox } from './models/securityBox.model'; // ✅ Importar SecurityBox para verificar datos

console.log('🔹 USERNAME_DATABASE:', process.env.USERNAME_DATABASE);
console.log('🔹 PASSWORD_DATABASE:', process.env.PASSWORD_DATABASE);
console.log('🔹 DATABASE_URL:', process.env.DATABASE_URL);

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	username: process.env.USERNAME_DATABASE,
	password: String(process.env.PASSWORD_DATABASE).trim(), // Convertimos a string y eliminamos espacios
	entities: ['src/data/postgres/models/**/*.ts'],
	synchronize: false, // desactivar sincronización porque ya tenemos datos
	logging: false,
	ssl:
		process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

export class PostgresDatabase {
	public datasource: DataSource;

	constructor() {
		this.datasource = AppDataSource;
	}

	async connect() {
		try {
			await this.datasource.initialize();
			console.log('✅ Database connected successfully!');

			// 🚀 Verificar si hay categorías en la base de datos
			const repository = this.datasource.getRepository(SecurityBox);
			const categories = await repository.find();

			if (categories.length === 0) {
				console.warn(
					'⚠️ No hay categorías en SecurityBox. ¿Están vacías en la BD?',
				);
			} else {
				console.log('📌 Categorías en la base de datos:', categories);
			}
		} catch (error) {
			console.error('❌ Database connection failed:', error);
		}
	}
}
