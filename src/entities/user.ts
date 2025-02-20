import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { SecurityBox } from './securityBox';

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

	// Relation with SecurityBox
	@OneToMany(() => SecurityBox, (securityBox) => securityBox.user)
	securityBoxes!: SecurityBox[];

	// Hash security pin before saving
	async setSecurityPin(pin: string) {
		this.securityPin = await bcrypt.hash(pin, 10);
	}

	// Validate security pin
	async validateSecurityPin(pin: string) {
		if (!this.securityPin) return false;
		return await bcrypt.compare(pin, this.securityPin);
	}
}
