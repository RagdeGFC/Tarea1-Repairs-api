import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import {
	encryptPassword,
	decryptPassword,
} from '../../../../presentation/passwordManager/utils/encryption';

@Entity()
export class Password {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => User, (user) => user.password)
	user!: User;

	@Column()
	service!: string;

	@Column()
	encryptedPassword!: string;

	set password(value: string) {
		this.encryptedPassword = encryptPassword(value);
	}

	get password(): string {
		return decryptPassword(this.encryptedPassword);
	}
}
