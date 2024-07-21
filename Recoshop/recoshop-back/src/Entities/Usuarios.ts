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
import { Categorias } from './Categorias';
import { Marcas } from './Marcas';
import { Comercios } from './Comercios';

@Entity('usuarios')
export class Usuarios extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 45, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    nombre: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    apellido: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    provincia: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    localidad: string;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    domicilio: string;

    @Column({ type: 'varchar', length: 70, nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 6, nullable: true })
    recpass: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @Column({ type: 'int', nullable: false })
    role: number;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @ManyToMany((type) => Comercios)
    @JoinTable({
        name: 'comercio_usuario', // table name for the junction table of this relation
        joinColumn: {
            name: 'usuarios',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'comercios',
            referencedColumnName: 'id',
        },
    })
    comercios: Comercios[];

    static findById(id: number) {
        return this.createQueryBuilder('usuario')
            .where('usuario.id = :id', { id })
            .getOne();
    }

    static findByEmail(email: string) {
        return this.createQueryBuilder('usuario')
            .where('usuario.email = :email', { email })
            .getOne();
    }

    static findByTelefono(telefono: string) {
        return this.createQueryBuilder('usuario')
            .where('usuario.telefono = :telefono', { telefono })
            .getOne();
    }

    static findByUsername(username: string) {
        return this.createQueryBuilder('usuario')
            .where('usuario.username = :username', { username })
            .getOne();
    }

    static findByRecpass(recpass: string) {
        return this.createQueryBuilder('usuario')
            .where('usuario.recpass = :recpass', { recpass })
            .getOne();
    }

    static saveCodeRecPass(usuario: Usuarios) {
        return this.createQueryBuilder('usuario')
            .update(usuario)
            .set({ recpass: usuario.recpass })
            .where('id = :id', { id: usuario.id })
            .execute();
    }

    static findByRolePaginated(
        pageNro: number,
        pageSize: number,
        role: string,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Filtrando por rol');
        return this.createQueryBuilder('usuario')
            .where('usuario.role LIKE :rol', { rol: '%' + role + '%' })
            .orderBy('usuario.nombre')
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
        return this.createQueryBuilder('usuario')
            .where(`LOWER(usuario.${attr}) LIKE LOWER(:txt)`, {
                txt: '%' + txt + '%',
            })
            .orderBy('usuario.nombre')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }
}
