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
import { Prestamos } from './prestamos.entity.sql';

@Entity('pagos')
export class Pagos extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'real', nullable: false })
    monto: number;

    @Column({ type: 'real', nullable: false })
    ganancia: number;

    @Column({ type: 'boolean', nullable: false })
    interes: boolean;

    @Column({ type: 'int', nullable: true })
    tasa_interes: number;

    @Column({ type: 'timestamp', nullable: false })
    fecha_hora: Date;

    @Column({ type: 'int', nullable: false })
    nro_cuota: number;

    @ManyToOne((type) => Prestamos, (pres) => pres.pagos)
    prestamoId: Prestamos;

    static findPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        return this.createQueryBuilder('pago')
            .orderBy('pago.fecha_hora', 'ASC')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }
}
