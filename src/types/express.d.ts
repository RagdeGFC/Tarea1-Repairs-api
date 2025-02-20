declare global {
	namespace Express {
		interface Request {
			user?: any; // Asegúrate de que 'user' esté presente en el objeto Request
		}
	}
}
