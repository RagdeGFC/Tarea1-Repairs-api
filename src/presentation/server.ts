import express from 'express';
import AppRoutes from './routes';

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

		console.log('📌 Cargando AppRoutes en Express...');
		this.app.use(AppRoutes);

		this.app.listen(this.port, () => {
			console.log(`✅ Server started on port ${this.port} 😊`);
		});
	}
}
