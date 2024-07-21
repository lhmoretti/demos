import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { Productos } from './Productos';

@Entity('categorias')
export class Categorias extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    categoria: string;

    @Column({ type: 'varchar' })
    url_img: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @OneToMany((type) => Productos, (producto) => producto.categoriaId)
    producto: Productos[];
}
