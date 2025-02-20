import 'module-alias/register';
import express from 'express';
import { PostgresDatabase } from './config/postgres-database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import securityBoxRoutes from './routes/securityBox.routes'; // Asegúrate de que las rutas estén importadas correctamente
import credentialRoutes from './routes/credential.routes';
import passwordRoutes from './routes/password.routes';
import pinRoutes from './routes/pin.routes';
const cors = require('cors');

async function connectDatabase() {
	try {
		const postgres = new PostgresDatabase();
		await postgres.connect();
		console.log('✅ Database connected successfully!');
	} catch (error) {
		console.error('❌ Error connecting to the database:', error);
		process.exit(1);
	}
}

function startServer() {
	const app = express();
	app.use(cors());
	app.use(express.json());

	// Registrar rutas
	app.use('/api/auth', authRoutes);
	app.use('/api/users', userRoutes);
	app.use('/api/security_box', securityBoxRoutes); // Verifica que esta línea esté presente
	app.use('/api/credential_storage', credentialRoutes);
	app.use('/api/passwords', passwordRoutes);
	app.use('/api/pins', pinRoutes);

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`✅ Server started on port ${PORT} 🚀`);
	});
}

// Ejecutar funciones
(async () => {
	await connectDatabase();
	startServer();
})();
