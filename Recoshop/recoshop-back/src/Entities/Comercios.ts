import {
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Entity,
    BaseEntity,
    JoinTable,
} from 'typeorm';
import { Usuarios } from './Usuarios';
import { Marcas } from './Marcas';
import { Productos } from './Productos';
import { CategoriasComercios } from './CategoriasComercios';

@Entity('comercios')
export class Comercios extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: true })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'varchar' })
    plan: string;

    @Column({ type: 'varchar', length: 11, nullable: true })
    cuit: string;

    @Column({ type: 'varchar', nullable: true })
    banner: string;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', nullable: true })
    domicilio: string;

    @Column({ type: 'varchar', nullable: true })
    localidad: string;

    @Column({ type: 'varchar', length: 70, nullable: true })
    email: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @Column({ type: 'boolean', default: true })
    socio_cic: boolean;

    @Column({ type: 'boolean', default: true })
    mp_acuerdo_vendedor: boolean;

    @Column({ type: 'boolean', default: false })
    mp_mercadopago: boolean;

    @Column({ type: 'boolean', default: false })
    mp_mercadopago_qr: boolean;

    @Column({ type: 'boolean', default: false })
    mp_trans_banc: boolean;

    @Column({ type: 'boolean', default: false })
    mp_pago_sucursal: boolean;

    @Column({ type: 'boolean', default: false })
    mp_abono_contra: boolean;

    @Column({ type: 'boolean', default: false })
    mp_pago_posnet: boolean;

    @Column({ type: 'boolean', default: true })
    e_acuerdo_vendedor: boolean;

    @Column({ type: 'boolean', default: false })
    e_delivery: boolean;

    @Column({ type: 'boolean', default: false })
    e_retiro_sucursal: boolean;

    @Column({ type: 'varchar', nullable: true })
    access_token: string;

    @Column({ type: 'timestamp', nullable: true })
    last_update_token: Date;

    @Column({ type: 'varchar', nullable: true })
    auth_code: string;

    @Column({ type: 'varchar', nullable: true })
    refresh_token: string;

    @OneToMany((type) => Productos, (producto) => producto.comercioId)
    productos: Productos[];

    @OneToMany((type) => Marcas, (marca) => marca.comercioId)
    marcas: Marcas[];

    @ManyToOne((type) => CategoriasComercios, (catcom) => catcom.comercioId)
    catComId: CategoriasComercios;

    @ManyToMany((type) => Usuarios, (usuario) => usuario.comercios)
    @JoinTable()
    usuarios: Usuarios[];

    static findByEmail(email: string) {
        return this.createQueryBuilder('comercio')
            .where('comercio.email = :email', { email })
            .getOne();
    }

    static findByTelefono(telefono: string) {
        return this.createQueryBuilder('comercio')
            .where('comercio.telefono = :telefono', { telefono })
            .getOne();
    }

    static UpdateComercioToken(comercio: Comercios) {
        return this.createQueryBuilder('comercio')
            .update(comercio)
            .set({ access_token: comercio.access_token })
            .where('id = :id', { id: comercio.id })
            .execute();
    }

    static findByUsername(username: string) {
        return this.createQueryBuilder('comercio')
            .where('comercio.username = :username', { username })
            .getOne();
    }

    static findPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando..');
        return this.createQueryBuilder('comercio')
            .orderBy('comercio.nombre')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }

    static findByTxtPaginated(
        pageNro: number,
        pageSize: number,
        attr: string,
        txt: string,
    ) {
        const skipRecords = pageNro * pageSize;
        // attr = col nombre, apellido, etc..
        console.log('Filtrando por txt');
        return this.createQueryBuilder('comercio')
            .where(`LOWER(comercio.${attr}) LIKE LOWER(:txt)`, {
                txt: '%' + txt + '%',
            })
            .orderBy('comercio.nombre')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }

    static findById(id: number) {
        return this.createQueryBuilder('comercio')
            .where('comercio.id = :id', { id })
            .getOne();
    }
    static saveTokens(comercio: Comercios) {
        return this.createQueryBuilder('comercio')
            .update(comercio)
            .set({
                last_update_token: comercio.last_update_token,
                auth_code: comercio.auth_code,
                access_token: comercio.access_token,
                refresh_token: comercio.refresh_token,
            })
            .where('id = :id', { id: comercio.id })
            .execute();
    }

    static getComerciosByUsuario(id: number) {
        return this.createQueryBuilder('comercio')
            .innerJoinAndSelect(
                'comercio.usuarios',
                'comuser',
                `comuser.id = :id`,
                {
                    id,
                },
            )
            .orderBy('comercio.nombre')
            .getMany();
    }
}
