import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
const cors = require('cors'); // import cors from 'cors'; no funcionó
import { DataSource } from 'typeorm';
import authRoutes from './routes/auth.routes'; // Rutas de autenticación
import userRoutes from './routes/user.routes'; // Rutas de usuarios
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Configuración de la base de datos usando TypeORM
export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true, // Sincroniza las tablas de la base de datos
	logging: false,
	entities: ['src/entities/*.ts'], // Las entidades deben estar en esta carpeta
});

// Inicializa la conexión a la base de datos
AppDataSource.initialize()
	.then(() => {
		console.log('📦 Conectado a la base de datos!');
	})
	.catch((error) =>
		console.error('Error conectando a la base de datos:', error),
	);

app.use(cors());
app.use(express.json());

// Registrar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en puerto ${PORT} 🚀`);
});
