import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	BaseEntity,
} from 'typeorm';
import { User } from './user.model';
import { decryptPassword, encryptPassword } from '../Utils/encryption';

@Entity()
export class Password extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => User, (user) => user.passwords)
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
