import { User } from '../../data/postgres/models/user.model';
import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { envs } from '../../config/env';

export class AuthService {
	static async login(email: string, password: string): Promise<string> {
		const user = await User.findOneBy({ email });
		if (!user) throw new Error('User not found');

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) throw new Error('Invalid credentials');

		// Verifica que el secreto JWT esté definido y sea del tipo correcto
		const secret: Secret = envs.JWT_SECRET;
		if (!secret) throw new Error('JWT_SECRET is not defined');

		// Asegurar que `JWT_EXPIRES_IN` sea un número o string válido
		const expiresIn: number | undefined = isNaN(Number(envs.JWT_EXPIRES_IN))
			? undefined
			: Number(envs.JWT_EXPIRES_IN);

		// Definir opciones para `jwt.sign`
		const options: SignOptions = expiresIn ? { expiresIn } : {};

		// Generación del token
		const token = jwt.sign({ id: user.id, email: user.email }, secret, options);

		return token;
	}
}
