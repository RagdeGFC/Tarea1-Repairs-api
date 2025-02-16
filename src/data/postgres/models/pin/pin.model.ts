import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { User } from '../user.model';
import { CredentialStorage } from '../credentialStorage.model';

@Entity('pin')
export class Pin {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 6 })
	code!: string;

	@ManyToOne(() => User)
	user!: User;

	@OneToMany(() => CredentialStorage, (credential) => credential.pin)
	credentials!: CredentialStorage[];
}
