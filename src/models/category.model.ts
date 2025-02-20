import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string = ''; // Inicialización por defecto

	@Column({ type: 'varchar', length: 100, unique: true })
	name: string = ''; // Inicialización por defecto
}
