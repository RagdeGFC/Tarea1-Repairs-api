import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
	constructor(private userService: UserService) {}

	async findAllUsers(req: Request, res: Response) {
		try {
			const users = await this.userService.getAll();
			res.json(users);
		} catch (error) {
			res.status(500).json({ message: 'Error al obtener usuarios' });
		}
	}

	async findOneUser(req: Request, res: Response) {
		try {
			const user = await this.userService.findById(req.params.id);
			if (!user)
				return res.status(404).json({ message: 'Usuario no encontrado' });
			res.json(user);
		} catch (error) {
			res.status(500).json({ message: 'Error al buscar usuario' });
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			console.log('📌 createUser() fue llamado con datos:', req.body); // Agregar log

			const newUser = await this.userService.create(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			res.status(500).json({ message: 'Error al crear usuario' });
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const updatedUser = await this.userService.update(
				req.params.id,
				req.body,
			);
			res.json(updatedUser);
		} catch (error) {
			res.status(500).json({ message: 'Error al actualizar usuario' });
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			await this.userService.delete(req.params.id);
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ message: 'Error al eliminar usuario' });
		}
	}

	async loginUser(req: Request, res: Response) {
		try {
			const user = await this.userService.login(req.body);
			if (!user)
				return res.status(401).json({ message: 'Credenciales incorrectas' });
			res.json(user);
		} catch (error) {
			res.status(500).json({ message: 'Error al iniciar sesión' });
		}
	}
}
