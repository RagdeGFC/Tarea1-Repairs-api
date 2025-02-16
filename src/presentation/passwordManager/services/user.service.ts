import { AppDataSource } from '../../../data/postgres/postgres-database';
import { User } from '../../../data/postgres/models/user.model';
import bcrypt from 'bcrypt';
import { JwtAdapter } from '../../../config/jwt.adapter';

export class UserService {
	async getAll() {
		return await AppDataSource.getRepository(User).find();
	}

	async findById(id: string) {
		return await AppDataSource.getRepository(User).findOne({ where: { id } });
	}

	async create(data: any) {
		return await AppDataSource.getRepository(User).save(data);
	}

	async update(id: string, data: any) {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { id } });
		if (!user) throw new Error('Usuario no encontrado');
		return await userRepository.update(id, data);
	}

	async delete(id: string) {
		const userRepository = AppDataSource.getRepository(User);
		const user = await userRepository.findOne({ where: { id } });
		if (!user) throw new Error('Usuario no encontrado');
		await userRepository.remove(user);
	}

	async login(credentials: { email: string; password: string }) {
		const user = await AppDataSource.getRepository(User).findOne({
			where: { email: credentials.email },
		});
		if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
			return null;
		}

		const token = JwtAdapter.generateToken({ id: user.id });
		return { user, token };
	}
}
