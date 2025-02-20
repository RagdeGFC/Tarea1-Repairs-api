import express from 'express';
import routes from '../routes/index'; // Importando correctamente el index.ts

interface Options {
	port: number;
}

export class Server {
	private readonly app = express();
	private readonly port: number;

	constructor(options: Options) {
		this.port = options.port;
	}

	async start() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		console.log('📌 Cargando rutas en Express...');
		this.app.use('/api', routes); // Ahora las rutas estarán bajo `/api`

		this.app.listen(this.port, () => {
			console.log(`✅ Server started on port ${this.port} 😊`);
		});
	}
}
