import 'dotenv/config';
import 'reflect-metadata';
import { PostgresDatabase } from './data/postgres/postgres-database';
import { envs } from './config';
import { Server } from './presentation/server';

async function main() {
	const postgres = new PostgresDatabase();
	await postgres.connect();

	const server = new Server({
		port: envs.PORT,
	});

	await server.start();
}

main();
console.log('JWT_SECRET:', envs.JWT_SECRET);
