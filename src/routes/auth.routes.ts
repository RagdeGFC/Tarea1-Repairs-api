import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

//  Register a new user
router.post('/register', async (req, res) => {
	await AuthController.register(req, res);
});

// Log in a user
router.post('/login', async (req, res) => {
	await AuthController.login(req, res);
});

export default router;
