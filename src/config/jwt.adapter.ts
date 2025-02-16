import jwt, {
	Secret,
	SignOptions,
	VerifyErrors,
	JwtPayload,
} from 'jsonwebtoken';
import { envs } from './env';

export class JwtAdapter {
	static async generateToken(payload: object): Promise<string> {
		return new Promise((resolve, reject) => {
			const secret: Secret = envs.JWT_SECRET;
			if (!secret) {
				reject(new Error('JWT_SECRET is not defined'));
				return;
			}

			// ✅ Convertimos `expiresIn` a `number` si es un número, o usamos `undefined`
			let expiresIn: SignOptions['expiresIn'];
			if (!isNaN(Number(envs.JWT_EXPIRES_IN))) {
				expiresIn = Number(envs.JWT_EXPIRES_IN); // Si es un número, lo usamos
			} else {
				expiresIn = undefined; // Evitamos valores inválidos
			}

			// ✅ `expiresIn` siempre tendrá el tipo correcto
			const options: SignOptions = { expiresIn };

			jwt.sign(payload, secret, options, (err, token) => {
				if (err || !token) {
					reject(err || new Error('Token generation failed'));
				} else {
					resolve(token);
				}
			});
		});
	}

	static async verifyToken(token: string): Promise<JwtPayload | string | null> {
		return new Promise((resolve, reject) => {
			const secret: Secret = envs.JWT_SECRET;
			if (!secret) {
				reject(new Error('JWT_SECRET is not defined'));
				return;
			}

			jwt.verify(token, secret, (err: VerifyErrors | null, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded || null);
				}
			});
		});
	}
}
