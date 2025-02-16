import 'dotenv/config';
import 'reflect-metadata';
import { PostgresDatabase } from './data/postgres/postgres-database';
import { envs } from './config';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';

async function main() {
	const postgres = new PostgresDatabase();
	await postgres.connect();

	const server = new Server({
		port: envs.PORT,
		routes: AppRoutes.routes,
	});

	await server.start();
}

main();
console.log('JWT_SECRET:', envs.JWT_SECRET);
