import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Productos } from './Productos';
import { Comercios } from './Comercios';

@Entity('marcas')
export class Marcas extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    marca: string;

    @ManyToOne((type) => Comercios, (com) => com.marcas)
    comercioId: Comercios;

    @OneToMany((type) => Productos, (producto) => producto.marcaId)
    producto: Productos[];
}
