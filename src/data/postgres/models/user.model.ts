import * as bcrypt from 'bcrypt';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	BaseEntity,
} from 'typeorm';
import { SecurityBox } from './securityBox.model';
import { Password } from './password.model';
import Pin from './pin/pin.model';

export enum Role {
	EMPLOYEE = 'EMPLOYEE',
	CLIENT = 'CLIENT',
}

export enum Status {
	AVAILABLE = 'AVAILABLE',
	DISABLE = 'DISABLE',
}

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('enum', { enum: Status, default: Status.AVAILABLE })
	status!: Status;

	@Column({ nullable: false }) //1
	name!: string;

	@Column({ nullable: false }) //2
	surname?: string;

	@Column({ unique: true, nullable: false }) //3
	email!: string;

	@Column({ nullable: false }) //4
	password!: string;

	@Column({ nullable: false }) //5
	cellphone!: string;

	@Column({ nullable: true })
	recoveryCode?: string;

	@Column({ nullable: true })
	securityPin?: string;

	@Column('enum', { enum: Role, default: Role.CLIENT })
	role!: Role;

	@OneToMany(() => SecurityBox, (securityBox) => securityBox.user)
	securityBoxes!: SecurityBox;

	@OneToMany(() => Password, (password) => password.user)
	passwords!: Password;

	@OneToMany(() => Pin, (pin) => pin.user)
	pins!: Pin[]; // 🔹 Ahora `pins` es un array correctamente definido
	// pins!: Pin;
}
