import 'dotenv/config';
import jwt, {
	Secret,
	SignOptions,
	VerifyErrors,
	JwtPayload,
} from 'jsonwebtoken';

export class JwtAdapter {
	static async generateToken(payload: object): Promise<string> {
		return new Promise((resolve, reject) => {
			const secret: Secret = process.env.JWT_SECRET || '';

			if (!process.env.JWT_SECRET) {
				console.error('❌ JWT_SECRET is not defined');
				reject(new Error('❌ JWT_SECRET is not defined'));
				return;
			}

			const expiresIn: SignOptions['expiresIn'] = !isNaN(
				Number(process.env.JWT_EXPIRES_IN),
			)
				? Number(process.env.JWT_EXPIRES_IN)
				: undefined;

			const options: SignOptions = { expiresIn };

			jwt.sign(payload, secret, options, (err, token) => {
				if (err || !token) {
					console.error('❌ Token generation failed:', err);
					reject(err || new Error('❌ Token generation failed'));
				} else {
					console.log('✅ Token generated successfully');
					resolve(token);
				}
			});
		});
	}

	static async verifyToken(token: string): Promise<JwtPayload | string | null> {
		return new Promise((resolve, reject) => {
			const secret: Secret = process.env.JWT_SECRET || '';

			if (!process.env.JWT_SECRET) {
				console.error('❌ JWT_SECRET is not defined');
				reject(new Error('❌ JWT_SECRET is not defined'));
				return;
			}

			jwt.verify(token, secret, (err: VerifyErrors | null, decoded) => {
				if (err) {
					console.error('❌ Invalid token:', err);
					reject(err);
				} else {
					console.log('✅ Token verified successfully');
					resolve(decoded || null);
				}
			});
		});
	}
}
