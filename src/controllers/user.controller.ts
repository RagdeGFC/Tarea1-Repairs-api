import { UserService } from '../services/user.service';
import { Response, Request } from 'express';

interface CustomRequest extends Request {
	user?: { id: string };
}

export class UserController {
	// Reset security PIN
	static async resetSecurityPin(req: Request, res: Response): Promise<void> {
		try {
			const { email, recoveryCode, newPin } = req.body;

			if (!email || !recoveryCode || !newPin) {
				console.error('❌ Missing required fields for resetting security PIN.');
				res.status(400).json({ message: '❌ All fields are required' });
				return;
			}

			const response = await UserService.resetSecurityPin(
				email,
				recoveryCode,
				newPin,
			);

			console.log('✅ Security PIN successfully reset.');
			res.status(200).json(response);
		} catch (error: any) {
			console.error('❌ Error resetting security PIN:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Set a new security PIN
	static async setSecurityPin(
		req: CustomRequest,
		res: Response,
	): Promise<void> {
		try {
			const userId = req.user?.id;
			const { pin } = req.body;

			if (!userId) {
				console.error('❌ User not authenticated.');
				res.status(400).json({ message: '❌ User not authenticated' });
				return;
			}

			if (!pin || pin.length !== 4) {
				console.error('❌ Invalid PIN format.');
				res.status(400).json({ message: '❌ PIN must be a 4-digit number' });
				return;
			}

			const response = await UserService.setSecurityPin(userId, pin);

			console.log('✅ Security PIN successfully set.');
			res.status(200).json(response);
		} catch (error: any) {
			console.error('❌ Error setting security PIN:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Register a new user
	static async register(req: Request, res: Response): Promise<void> {
		try {
			const { name, surname, email, cellphone, password } = req.body;

			if (!name || !surname || !email || !cellphone || !password) {
				console.error('❌ Missing required fields for user registration.');
				res.status(400).json({ message: '❌ All fields are required' });
				return;
			}

			const response = await UserService.registerUser(
				name,
				surname,
				email,
				cellphone,
				password,
			);

			console.log('✅ User successfully registered.');
			res.status(201).json(response);
		} catch (error: any) {
			console.error('❌ Error registering user:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Log in a user
	static async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				console.error('❌ Missing email or password.');
				res.status(400).json({ message: '❌ Email and password are required' });
				return;
			}

			const response = await UserService.loginUser(email, password);
			console.log('✅ User successfully logged in.');
			res.status(200).json(response);
		} catch (error: any) {
			console.error('❌ Error logging in user:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}

	// Retrieve all users
	static async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserService.getAllUsers();

			console.log('✅ Users successfully retrieved.');
			res.status(200).json(users);
		} catch (error: any) {
			console.error('❌ Error retrieving users:', error);
			res.status(500).json({ message: '❌ Unknown error' });
		}
	}
}
