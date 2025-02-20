import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { encryptPassword, decryptPassword } from '../utils/encryption';
import { User } from './user';
// import { User } from './user';

@Entity()
export class Password {
	@PrimaryGeneratedColumn()
	id!: number;

	// Relation with User
	@ManyToOne(() => User, (user) => user.password)
	user!: User;

	@Column()
	service!: string;

	@Column()
	encryptedPassword!: string;

	// Encrypt password before saving
	set password(value: string) {
		this.encryptedPassword = encryptPassword(value);
	}

	// Decrypt password when retrieving
	get password(): string {
		return decryptPassword(this.encryptedPassword);
	}
}
