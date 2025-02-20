import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import { AppDataSource } from '../config/postgres-database';

export class AuthService {
	// Register a new user
	static async register(
		name: string,
		surname: string,
		email: string,
		cellphone: string,
		password: string,
	) {
		const userRepository = AppDataSource.getRepository(User);
		const existingUser = await userRepository.findOne({ where: { email } });

		if (existingUser) throw new Error('❌ User already exists');

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = userRepository.create({
			name,
			surname,
			email,
			cellphone,
			password: hashedPassword,
		});

		await userRepository.save(newUser);
		return newUser;
	}

	// Log in a user
	static async login(email: string, password: string) {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { email } });

		if (!user) throw new Error('❌ Invalid credentials');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new Error('❌ Invalid credentials');

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET || '',
			{ expiresIn: '1h' },
		);

		return { message: '✅ Login successful', token, user };
	}
}
