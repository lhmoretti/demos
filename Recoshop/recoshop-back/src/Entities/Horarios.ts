import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';

@Entity('horarios')
export class Horarios extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 5 })
    horario: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;
}
