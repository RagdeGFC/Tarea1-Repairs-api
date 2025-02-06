import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';
import { UpdateUserDTO } from '../../domain/dtos/users/update-user.dto';

export class UserController {
	constructor(private readonly userService: UserService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}

		console.error(error);
		return res.status(500).json({ message: 'Something went very wrong!! ❌' });
	};

	findAllUsers = async (req: Request, res: Response) => {
		this.userService
			.findAll()
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	findOneUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.userService
			.findOne(id)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	createUser = async (req: Request, res: Response) => {
		const [error, createUserDto] = CreateUserDTO.create(req.body);

		if (error) {
			return res.status(422).json({ message: error });
		}

		this.userService
			.create(createUserDto!)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	updateUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		const [error, updateUserDto] = UpdateUserDTO.create(req.body);

		if (error) {
			return res.status(422).json({ message: error });
		}
		this.userService
			.update(id, updateUserDto!)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	deleteUser = async (req: Request, res: Response) => {
		const { id } = req.params;

		this.userService
			.delete(id)
			.then((data) => res.status(204).json(data))
			.catch((error: any) => this.handleError(error, res));
	};

	loginUser = (req: Request, res: Response) => {
		const { email, password } = req.body;
		this.userService
			.login(email, password)
			.then((data) => res.status(200).json(data))
			.catch((error: any) => this.handleError(error, res));
	};
}
