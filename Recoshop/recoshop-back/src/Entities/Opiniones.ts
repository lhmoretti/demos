import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Usuarios } from './Usuarios';
import { Productos } from './Productos';

@Entity('opiniones')
export class Opiniones extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    opinion: string;

    @Column({ type: 'integer', nullable: false })
    puntaje: number;

    @Column({ type: 'date', nullable: true })
    fecha: Date;

    @Column({ type: 'time', nullable: true })
    hora: string;

    @ManyToOne((type) => Usuarios, (usuario) => usuario.id, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    usuario: Usuarios;

    @ManyToOne((type) => Productos, (producto) => producto.opinion)
    producto: Productos;
}
