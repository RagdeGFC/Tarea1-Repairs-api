import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import { AppDataSource } from '../app';

export class UserService {
	// Retrieve all users
	static async getAllUsers(): Promise<User[]> {
		const userRepository = AppDataSource.getRepository(User);
		const users = await userRepository.find();
		console.log('✅ Users successfully retrieved.');
		return users;
	}

	// Log in a user
	static async loginUser(email: string, password: string): Promise<any> {
		try {
			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOne({ where: { email } });

			if (!user) {
				console.error('❌ User not found.');
				throw new Error('❌ User not found');
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				console.error('❌ Incorrect password.');
				throw new Error('❌ Incorrect password');
			}

			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET as string,
				{ expiresIn: '1h' },
			);

			console.log('✅ User successfully logged in.');
			return { message: '✅ Login successful', token };
		} catch (error: any) {
			console.error('❌ Error logging in user:', error);
			throw new Error('❌ Unknown error');
		}
	}

	// Register a new user
	static async registerUser(
		name: string,
		surname: string,
		email: string,
		cellphone: string,
		password: string,
	): Promise<any> {
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			const userRepository = AppDataSource.getRepository(User);
			const user = userRepository.create({
				name,
				surname,
				email,
				cellphone,
				password: hashedPassword,
			} as Partial<User>);

			await userRepository.save(user);
			console.log('✅ User successfully registered.');
			return { message: '✅ User successfully registered', user };
		} catch (error: any) {
			console.error('❌ Error registering user:', error);
			throw new Error('❌ Unknown error');
		}
	}

	// Reset security PIN
	static async resetSecurityPin(
		email: string,
		recoveryCode: string,
		newPin: string,
	) {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({
			where: { email, recoveryCode },
		});

		if (!user) {
			console.error('❌ Incorrect recovery code or user not found.');
			throw new Error('❌ Incorrect recovery code or user not found');
		}

		user.securityPin = await bcrypt.hash(newPin, 10);
		user.recoveryCode = undefined;
		await userRepository.save(user);

		console.log('✅ Security PIN successfully reset.');
		return { message: '✅ Security PIN successfully reset' };
	}

	// Set a new security PIN
	static async setSecurityPin(userId: string, pin: string) {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { id: userId } });

		if (!user) {
			console.error('❌ User not found.');
			throw new Error('❌ User not found');
		}

		user.securityPin = await bcrypt.hash(pin, 10);
		await userRepository.save(user);

		console.log('✅ Security PIN successfully set.');
		return { message: '✅ Security PIN successfully set' };
	}

	// Validate security PIN
	static async validateSecurityPin(userId: string, pin: string) {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { id: userId } });

		if (!user) {
			console.error('❌ User not found.');
			throw new Error('❌ User not found');
		}

		if (!user.securityPin) {
			console.error('❌ Security PIN is undefined.');
			throw new Error('❌ Security PIN is undefined');
		}

		const isValid = await bcrypt.compare(pin, user.securityPin);
		console.log(
			`✅ Security PIN validation: ${isValid ? 'Success' : 'Failure'}`,
		);
		return isValid;
	}
}
