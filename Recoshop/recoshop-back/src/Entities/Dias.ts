import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Horarios } from './Horarios';

@Entity('dias')
export class Dias extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 10 })
    dia: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @ManyToMany((type) => Horarios)
    @JoinTable({
        name: 'dias_horarios', // table name for the junction table of this relation
        joinColumn: {
            name: 'dia',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'horario',
            referencedColumnName: 'id',
        },
    })
    horarios: Horarios[];
}
