import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from './jwt.adapter';
import { User } from '../models/user.model';

export class AuthMiddleware {
	static async protect(req: Request, res: Response, next: NextFunction) {
		const authorization = req.header('Authorization');

		if (!authorization || !authorization.startsWith('Bearer ')) {
			return res
				.status(401)
				.json({ message: 'Token no válido, inicia sesión' });
		}

		const token = authorization.split(' ')[1];

		try {
			const payload = (await JwtAdapter.verifyToken(token)) as { id: string };
			if (!payload) return res.status(401).json({ message: 'Token inválido' });

			const user = await User.findOne({ where: { id: payload.id } });
			if (!user)
				return res.status(401).json({ message: 'Usuario no encontrado' });

			req.user = user; // Asignamos el usuario a req.user
			console.log('Usuario autenticado:', req.user); // Verificamos que req.user esté correctamente asignado
			next();
		} catch (error) {
			return res
				.status(500)
				.json({ message: 'Error interno de autenticación' });
		}
	}
}
