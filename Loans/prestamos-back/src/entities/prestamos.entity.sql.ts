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
import { Usuarios } from './usuarios.entity.sql';
import { Pagos } from './pagos.entity.sql';

@Entity('prestamos')
export class Prestamos extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'real', nullable: false })
    monto: number;

    @Column({ type: 'real', nullable: false })
    valor_cuota: number;

    @Column({ type: 'timestamp', nullable: true })
    fecha_hora: Date;

    @Column({ type: 'timestamp', nullable: true })
    vencimiento: Date;

    @Column({ type: 'real', nullable: true })
    tasa_interes: number;

    @Column({ type: 'real', nullable: true })
    intereses: number;

    @Column({ type: 'int', nullable: true })
    cantidad_cuotas: number;

    @Column({ type: 'int', nullable: true })
    cuotas_pagadas: number;

    @Column({ type: 'varchar', nullable: true })
    tipo_pago: string;

    @Column({ type: 'real', nullable: true })
    saldo: number;

    @Column({ type: 'varchar', nullable: true })
    estado: string;

    @ManyToOne((type) => Usuarios, (usuario) => usuario.id, {
        onDelete: 'CASCADE',
    })
    usuarioId: Usuarios;

    @OneToMany((type) => Pagos, (pago) => pago.prestamoId, {
        onDelete: 'CASCADE',
    })
    pagos: Pagos[];

    static findPaginaByEstado(
        pageNro: number,
        pageSize: number,
        estado: string,
        order: string,
        ad: any,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('estado: string, order: string, ad: any');
        console.log(estado, order, ad);

        if (estado === 'Todos') {
            console.log(
                `Filtrando por todos los estados, y ordenenando por ${order}`,
            );
            return this.createQueryBuilder('prestamos')
                .leftJoinAndSelect('prestamos.usuarioId', 'usuario')
                .leftJoinAndSelect('prestamos.pagos', 'pago')
                .orderBy(`prestamos.${order}`, ad)
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        } else {
            console.log(
                `Filtrando por estado: ${estado}, y ordenenando por ${order}`,
            );
            return this.createQueryBuilder('prestamos')
                .leftJoinAndSelect('prestamos.usuarioId', 'usuario')
                .leftJoinAndSelect('prestamos.pagos', 'pago')
                .where(`LOWER(prestamos.estado) LIKE LOWER(:estado)`, {
                    estado: '%' + estado + '%',
                })
                .orderBy(`prestamos.${order}`, ad)
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        }
    }

    // static getPrestamoByIdUsuario(pageNro: number, pageSize: number, id: number) {
    //     const skipRecords = pageNro * pageSize;
    //     // attr = col nombre, apellido, etc..
    //     console.log('Filtrando por txt');
    //     return this.createQueryBuilder('prestamos')
    //         .where(`LOWER(prestamos.${attr}) LIKE LOWER(:txt)`, { txt: '%' + txt + '%' })
    //         .orderBy('prestamos.nombre')
    //         .offset(skipRecords)
    //         .limit(pageSize)
    //         .getMany();
    // }
}
