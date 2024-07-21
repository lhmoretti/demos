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

@Entity('banners')
export class Banners extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 20 })
    titulo: string;

    @Column({ type: 'varchar' })
    descrip: string;

    @Column({ type: 'varchar' })
    link: string;

    @Column({ type: 'varchar' })
    url: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;
}
