import { AppDataSource } from '../../../data/postgres/postgres-database';
import Pin from '../../../data/postgres/models/pin/pin.model';
import { User } from '../../../data/postgres/models/user.model';

export class PinService {
	static async validatePin(userId: string, code: string) {
		// 🔹 Obtener el usuario con su relación de PINs
		const user = await AppDataSource.getRepository(User).findOne({
			where: { id: userId },
			relations: ['pins'], // Aseguramos que 'pins' sea un array
		});

		if (!user) {
			throw new Error('Usuario no encontrado');
		}

		// 🔹 Verificar que el usuario tenga PINs registrados antes de acceder a ellos
		if (!user.pins || !Array.isArray(user.pins) || user.pins.length === 0) {
			throw new Error('El usuario no tiene PINs registrados.');
		}

		// 🔹 Buscar si el código coincide con algún PIN del usuario
		const pinExists = user.pins.find((pin) => pin.code === code);

		if (!pinExists) {
			throw new Error('PIN incorrecto');
		}

		return { message: 'PIN is valid' };
	}
}
