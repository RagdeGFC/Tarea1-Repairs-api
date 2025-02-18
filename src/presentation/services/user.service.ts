import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { JwtAdapter } from '../../config/jwt.adapter';
import { Status, User } from '../../data/postgres/models/user.model';
import { CustomError } from '../../domain/services';
import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';
import { UpdateUserDTO } from '../../domain/dtos/users/update-user.dto';
import { AppDataSource } from '../../data/postgres/postgres-database';

export class UserService {
	private userRepository = AppDataSource.getRepository(User);

	// Obtener un usuario por ID
	async findOne(id: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id, status: Status.AVAILABLE },
		});
		if (!user) throw CustomError.notFound('User not found');
		return user;
	}

	// Obtener todos los usuarios activos
	async findAll(): Promise<User[]> {
		return await this.userRepository.find({
			where: { status: Status.AVAILABLE },
		});
	}

	// Crear un nuevo usuario
	async create(data: CreateUserDTO): Promise<User> {
		const newUser = this.userRepository.create({
			name: data.name,
			email: data.email,
			password: data.password,
			role: data.role,
		});

		try {
			return await this.userRepository.save(newUser);
		} catch (error) {
			console.error(error);
			throw CustomError.internalServer('Error creating user.');
		}
	}

	// Actualizar un usuario por ID
	async update(id: string, data: UpdateUserDTO): Promise<{ message: string }> {
		const user = await this.findOne(id);
		await this.userRepository.update(id, {
			name: data.name,
			email: data.email,
		});

		return { message: 'User updated' };
	}

	// Deshabilitar un usuario
	async delete(id: string): Promise<{ ok: boolean }> {
		await this.userRepository.update(id, { status: Status.DISABLE });
		return { ok: true };
	}

	// Inicio de sesión de usuario
	async login(
		email: string,
		password: string,
	): Promise<{ token: string; user: Partial<User> }> {
		const user = await this.findByEmail(email);
		const isMatching = await bcryptAdapter.compare(password, user.password);
		if (!isMatching) throw CustomError.unAuthorized('Invalid credentials');

		const token = await JwtAdapter.generateToken({ id: user.id });
		if (!token) throw CustomError.internalServer('Error generating token');

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}

	// Buscar usuario por email
	async findByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { email, status: Status.AVAILABLE },
		});
		if (!user) throw CustomError.notFound('User not found');
		return user;
	}
}
