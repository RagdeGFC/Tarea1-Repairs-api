import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { Pin } from './pin/pin.model';
import { SecurityBox } from './securityBox.model';

@Entity()
export class CredentialStorage {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	service!: string;

	@Column()
	username!: string;

	@Column()
	account!: string;

	@Column()
	password!: string;

	@Column({ nullable: true })
	description?: string; // Se permite nulo en la BD

	@Column({ nullable: true })
	code_1?: string; // Se permite nulo en la BD

	@Column({ nullable: true })
	code_2?: string; // Se permite nulo en la BD

	@ManyToOne(() => User, (user) => user.securityBoxes, { nullable: true })
	user!: User;

	@ManyToOne(() => Pin, (pin) => pin.credentials, { nullable: true })
	pin!: Pin;

	@ManyToOne(() => SecurityBox, (securityBox) => securityBox.credentials, {
		nullable: true,
	})
	securityBox!: SecurityBox;
}
