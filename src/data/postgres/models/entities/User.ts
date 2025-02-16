import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SecurityBox } from './securityBox.model';
import bcrypt from 'bcrypt';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column()
	surname!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column()
	cellphone!: string;

	@Column({ nullable: true })
	recoveryCode?: string;

	@Column({ nullable: true })
	securityPin?: string;

	@OneToMany(() => SecurityBox, (securityBox) => securityBox.user)
	securityBoxes!: SecurityBox[];

	async setSecurityPin(pin: string) {
		this.securityPin = await bcrypt.hash(pin, 10);
	}

	async validateSecurityPin(pin: string) {
		if (!this.securityPin) return false;
		return await bcrypt.compare(pin, this.securityPin);
	}
}
