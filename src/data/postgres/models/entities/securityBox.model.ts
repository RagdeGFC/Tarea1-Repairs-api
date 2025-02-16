import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { User } from './User';
import { CredentialStorage } from './credentialStorage.model';

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

	@ManyToOne(() => User, (user) => user.securityBoxes)
	user!: User;

	@OneToMany(() => CredentialStorage, (credential) => credential.securityBox)
	credentials!: CredentialStorage[];
}
