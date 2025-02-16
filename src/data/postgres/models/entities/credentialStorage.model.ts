import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SecurityBox } from './securityBox.model';
import { Pin } from '../pin/pin.model';

@Entity('credential_storage')
export class CredentialStorage {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ length: 100 })
	account!: string;

	@Column({ length: 255 })
	password!: string;

	@Column('text', { nullable: true })
	description?: string;

	@Column({ length: 20, nullable: true })
	code_1?: string;

	@Column({ length: 20, nullable: true })
	code_2?: string;

	@Column({ length: 100 })
	service!: string;

	@Column({ length: 100 })
	username!: string;

	@ManyToOne(() => SecurityBox, (securityBox) => securityBox.credentials)
	securityBox!: SecurityBox;

	@ManyToOne(() => Pin, (pin) => pin.credentials)
	pin!: Pin;
}
