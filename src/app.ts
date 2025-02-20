import 'reflect-metadata'; // Necesario para TypeORM
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import express from 'express';
const cors = require('cors');

// ✅ Importar rutas usadas hasta ahora
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

// ✅ Inicializar Express
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Configuración de la base de datos
export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: [__dirname + '/entities/*.ts'], // Asegura que TypeORM cargue las entidades
	migrations: [],
	subscribers: [],
});

AppDataSource.initialize()
	.then(() => {
		console.log('✅ Successfully connected to the database!');
		console.log(
			'✅ Loaded entities:',
			AppDataSource.entityMetadatas.map((e) => e.name),
		);
	})
	.catch((error) => {
		console.error('❌ Error connecting to the database:', error);
	});

// ✅ Definir las rutas activas hasta ahora
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`✅ Server running on port ${PORT}`);

	// ✅ Mostrar rutas activas en la terminal
	console.log(
		'✅ Loaded routes:',
		app._router.stack.filter((r: any) => r.route).map((r: any) => r.route.path),
	);
});
