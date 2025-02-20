import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface AuthRequest extends Request {
	user?: any;
}

export const authMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.header('Authorization')?.split(' ')[1];

	if (!token) {
		console.error('❌ Access denied, token not provided.');
		return res
			.status(401)
			.json({ message: '❌ Access denied, token not provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		req.user = decoded;

		console.log('✅ Token successfully verified.');
		next();
	} catch (error) {
		console.error('❌ Invalid token.');
		return res.status(401).json({ message: '❌ Invalid token' });
	}
};
