import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import { Usuarios } from './Usuarios';
import { Pedidos } from './Pedidos';

@Entity('pedidoslineas')
export class PedidosLineas extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'bigint', nullable: false })
    id_prod: number;

    @Column({ type: 'int', nullable: false })
    comercioId: number;

    @Column({ type: 'int', nullable: false })
    cantidad: number;

    @Column({ type: 'int', nullable: false })
    unidad: number;

    @Column({ type: 'varchar', nullable: true })
    img: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 140, nullable: false })
    descripcion: string;

    @Column({ type: 'real', nullable: false })
    precio_venta: number;

    @Column({ type: 'real', nullable: true })
    precio_oferta: number;

    @Column({ type: 'boolean', nullable: true, default: false })
    oferta: boolean;

    @ManyToMany((type) => Pedidos, (pedido) => pedido.pedido_lineas)
    pedido: Pedidos[];
}
