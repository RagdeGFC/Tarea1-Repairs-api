import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	entities: ['src/data/postgres/models/**/*.ts'],
	synchronize: false,
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
