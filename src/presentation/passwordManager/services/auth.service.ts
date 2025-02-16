import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { AppDataSource } from '../config/ormconfig';
import dotenv from 'dotenv';

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
	static async register(
		name: string,
		surname: string,
		email: string,
		cellphone: string,
		password: string,
	) {
		const existingUser = await userRepository.findOne({ where: { email } });
		if (existingUser) throw new Error('El usuario ya existe');

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

	static async login(email: string, password: string) {
		const user = await userRepository.findOne({ where: { email } });
		if (!user) throw new Error('Credenciales incorrectas');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new Error('Credenciales incorrectas');

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET as string,
			{ expiresIn: '1h' },
		);

		return { token, user };
	}
}
