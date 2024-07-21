import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Horarios } from './Horarios';

@Entity('errores')
export class Errores extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar' })
    fecha_hora: Date;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'integer' })
    status: number;

    @Column({ type: 'varchar' })
    statusText: string;

    @Column({ type: 'varchar' })
    url: string;

    @Column({ type: 'boolean' })
    ok: false;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'text' })
    error: string;
}
