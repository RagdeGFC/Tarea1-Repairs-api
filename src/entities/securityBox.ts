import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CredentialStorage } from './credential.storage';
import { User } from './user';

@Entity('security_box')
export class SecurityBox {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 100 })
	name!: string;

	@Column({ default: false })
	favorite!: boolean;

	@Column({ length: 20, nullable: true })
	icon!: string;

	@Column({ default: 'active' })
	status!: string;

	// Relation with User
	@ManyToOne(() => User, (user) => user.securityBoxes)
	user!: User;

	// Relation with CredentialStorage
	@OneToMany(() => CredentialStorage, (credential) => credential.securityBox)
	credentials!: CredentialStorage[];
}
