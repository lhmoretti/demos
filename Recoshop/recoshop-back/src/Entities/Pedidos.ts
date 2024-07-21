import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Usuarios } from './Usuarios';
import { PedidosLineas } from './PedidosLineas';
import { Comercios } from './Comercios';

@Entity('pedidos')
export class Pedidos extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'timestamp', nullable: false })
    fecha_hora: Date;

    @Column({ type: 'date', nullable: true })
    fecha_entrega: Date;

    @Column({ type: 'time', nullable: true })
    hora_entrega: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    comentario: string;

    @Column({ type: 'char', length: 1, nullable: true })
    estado: string;

    @Column({ type: 'real', nullable: false })
    total: number;

    @Column({ type: 'varchar', nullable: true })
    ext_ref: string;

    @Column({ type: 'varchar', nullable: true })
    modo_pago: string;

    @Column({ type: 'varchar', nullable: false })
    modo_entrega: string;

    @ManyToOne((type) => Usuarios, (usuario) => usuario.id)
    usuarioId: Usuarios;

    @ManyToOne((type) => Comercios, (comercio) => comercio.id)
    comercioId: Comercios;

    @ManyToMany(
        (type) => PedidosLineas,
        (pedido_lineas) => pedido_lineas.pedido,
        { cascade: true },
    )
    @JoinTable()
    pedido_lineas: PedidosLineas[];

    static findPaginatedByEstado(
        pageNro: number,
        pageSize: number,
        est: string,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando pedidos x estado');
        return this.createQueryBuilder('pedidos')
            .where(`pedidos.estado = :est`, { est })
            .leftJoinAndSelect('pedidos.usuarioId', 'usuario')
            .innerJoinAndSelect('pedidos.comercioId', 'pc')
            .innerJoinAndSelect('pedidos.pedido_lineas', 'pl')
            .orderBy('pedidos.fecha_hora', 'ASC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

    static getPaginatedByEstadoAndComercio(
        pageNro: number,
        pageSize: number,
        est: string,
        idCom: string,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando pedidos x estado y x idCom');
        return this.createQueryBuilder('pedidos')
            .innerJoinAndSelect('pedidos.comercioId', 'pc', `pc.id = :idCom`, {
                idCom,
            })
            .leftJoinAndSelect('pedidos.usuarioId', 'usuario')
            .andWhere(`pedidos.estado = :est`, { est })
            .leftJoinAndSelect('pedidos.pedido_lineas', 'pl')
            .orderBy('pedidos.fecha_hora', 'ASC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

    static getPaginatedByEstadoAndUser(
        pageNro: number,
        pageSize: number,
        est: string,
        idUsuario: string,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando pedidos x estado y x id Usuario');
        return this.createQueryBuilder('pedidos')
            .innerJoinAndSelect(
                'pedidos.usuarioId',
                'pu',
                `pu.id = :idUsuario`,
                {
                    idUsuario,
                },
            )
            .innerJoinAndSelect('pedidos.comercioId', 'pc')
            .andWhere(`pedidos.estado = :est`, { est })
            .leftJoinAndSelect('pedidos.pedido_lineas', 'pl')
            .orderBy('pedidos.fecha_hora', 'ASC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

    static getPaginatedByUser(
        pageNro: number,
        pageSize: number,
        idUsuario: string,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando pedidos x id Usuario');
        return this.createQueryBuilder('pedidos')
            .innerJoinAndSelect(
                'pedidos.usuarioId',
                'pu',
                `pu.id = :idUsuario`,
                {
                    idUsuario,
                },
            )
            .innerJoinAndSelect('pedidos.comercioId', 'pc')
            .leftJoinAndSelect('pedidos.pedido_lineas', 'pl')
            .orderBy('pedidos.fecha_hora', 'ASC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
}
