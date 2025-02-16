import { DataSource } from 'typeorm';

console.log('🔹 USERNAME_DATABASE:', process.env.USERNAME_DATABASE);
console.log('🔹 PASSWORD_DATABASE:', process.env.PASSWORD_DATABASE);
console.log('🔹 DATABASE_URL:', process.env.DATABASE_URL);

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	username: process.env.USERNAME_DATABASE,
	password: String(process.env.PASSWORD_DATABASE).trim(), // Convertimos a string y eliminamos espacios
	entities: ['src/data/postgres/models/**/*.ts'],
	synchronize: false, // desactivar sincronizacion porque ya tenemos datos
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
		} catch (error) {
			console.error('❌ Database connection failed:', error);
		}
	}
}
