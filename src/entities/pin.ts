import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CredentialStorage } from './credential.storage';
import { User } from './user';

@Entity('pin')
export class Pin {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 6 })
	code!: string;

	// Relation with User
	@ManyToOne(() => User)
	user!: User;

	// Relation with CredentialStorage
	@OneToMany(() => CredentialStorage, (credential) => credential.pin)
	credentials!: CredentialStorage[];
}
