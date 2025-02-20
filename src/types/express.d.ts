//#1
// import { Request } from 'express';
// export interface AuthenticatedRequest extends Request {
// 	user?: { id: string };
// }
//************************************* */
//#2
// declare global {
// 	namespace Express {
// 		interface Request {
// 			user?: { id: string };
// 		}
// 	}
// }
// export {};
//************************************** */
//#3
// declare global {
// 	namespace Express {
// 		interface Request {
// 			user?: any;
// 		}
// 	}
// }

// export {};
//************************************** */
//#4
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
	user?: { id: string };
}

declare global {
	namespace Express {
		interface Request {
			user?: { id: string };
		}
	}
}

export {};
