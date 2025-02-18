import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { PostgresDatabase } from './data/postgres/postgres-database';
import { envs } from './config';
import routes from './presentation/routes'; // Importamos todas las rutas
import securityBoxRoutes from './presentation/passwordManager/routes/securityBox.routes';
const cors = require('cors'); // import cors from 'cors'; // no funcionó

async function main() {
	try {
		// Conectar a la base de datos
		const postgres = new PostgresDatabase();
		await postgres.connect();
		console.log('✅ Database connected successfully!');

		// Crear la aplicación Express
		const app = express();

		// Configurar middlewares
		app.use(cors());
		app.use(express.json());

		//bandera
		console.log('📌 Registrando rutas en Express...');

		// Registrar rutas principales
		app.use('/api', routes);
		app.use('/api/security_box', securityBoxRoutes);
		console.log('📌 Rutas de securityBox registradas directamente en app.ts');

		// Iniciar el servidor
		const PORT = envs.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`✅ Server started on port ${PORT} 🚀`);
		});
	} catch (error) {
		console.error('❌ Error starting the server:', error);
		process.exit(1);
	}
}

main();
