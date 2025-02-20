import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import { AppDataSource } from '../app';

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
	// Register a new user
	static async register(
		name: string,
		surname: string,
		email: string,
		cellphone: string,
		password: string,
	) {
		const existingUser = await userRepository.findOne({ where: { email } });
		if (existingUser) {
			console.error('❌ User already exists.');
			throw new Error('❌ User already exists');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = userRepository.create({
			name,
			surname,
			email,
			cellphone,
			password: hashedPassword,
		});

		await userRepository.save(newUser);
		console.log('✅ User successfully registered.');
		return newUser;
	}

	// Authenticate user and generate token
	static async login(email: string, password: string) {
		const user = await userRepository.findOne({ where: { email } });
		if (!user) {
			console.error('❌ Incorrect credentials.');
			throw new Error('❌ Incorrect credentials');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			console.error('❌ Incorrect credentials.');
			throw new Error('❌ Incorrect credentials');
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET as string,
			{ expiresIn: '1h' },
		);

		console.log('✅ User successfully logged in.');
		return { token, user };
	}
}
