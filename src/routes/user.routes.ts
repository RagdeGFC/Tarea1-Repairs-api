import { UserController } from '../controllers/user.controller';
import { Router, Request, Response } from 'express';

const router = Router();

// Retrieve all users
router.get('/', (req: Request, res: Response) => {
	console.log('✅ Retrieving all users.');
	UserController.getAllUsers(req, res);
});

// Set security PIN
router.post('/set-pin', (req: Request, res: Response) => {
	console.log('✅ Setting security PIN.');
	UserController.setSecurityPin(req, res);
});

// Register a new user
router.post('/register', (req: Request, res: Response) => {
	console.log('✅ Registering new user.');
	UserController.register(req, res);
});

// User login
router.post('/login', (req: Request, res: Response) => {
	console.log('✅ User logging in.');
	UserController.login(req, res);
});

// Reset security PIN
router.post('/reset-pin', (req: Request, res: Response) => {
	console.log('✅ Resetting security PIN.');
	UserController.resetSecurityPin(req, res);
});

export default router;
