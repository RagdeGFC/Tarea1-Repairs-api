//version #1
// import { User } from '../data/postgres/models/user.model';

// declare global {
// 	namespace Express {
// 		interface Request {
// 			user?: User;
// 		}
// 	}
// }

// export {};
//version #2
// declare namespace Express {
// 	export interface Request {
// 		user?: {
// 			id: string;
// 			email: string;
// 		};
// 	}
// }
// version #3
// import { Request } from 'express';

declare global {
	namespace Express {
		interface Request {
			user?: any; // Asegúrate de que 'user' esté presente en el objeto Request
		}
	}
}
