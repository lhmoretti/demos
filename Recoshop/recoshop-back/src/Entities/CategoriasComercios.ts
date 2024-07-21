import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { Comercios } from './Comercios';

@Entity('categorias_comercios')
export class CategoriasComercios extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    categoria: string;

    @OneToMany((type) => Comercios, (com) => com.catComId)
    comercioId: Comercios;
}
