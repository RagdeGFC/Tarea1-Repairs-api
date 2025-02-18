import { User } from '../data/postgres/models/user.model';

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

export {};
