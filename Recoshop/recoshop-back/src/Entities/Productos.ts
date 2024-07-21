import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Marcas } from './Marcas';
import { Categorias } from './Categorias';
import { Opiniones } from './Opiniones';
import { Imagenes } from './Imagenes';
import { Comercios } from './Comercios';

@Entity('productos')
export class Productos extends BaseEntity {
    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nombre: string;

    @Column({ type: 'text', nullable: false })
    descripcion: string;

    @Column({ type: 'int', nullable: false })
    unidad: number;

    @Column({ type: 'int', nullable: true })
    alto: number;

    @Column({ type: 'int', nullable: true })
    ancho: number;

    @Column({ type: 'int', nullable: true })
    profundidad: number;

    @Column({ type: 'int', nullable: true })
    peso: number;

    @Column({ type: 'real', nullable: true })
    precio_costo: number;

    @Column({ type: 'real', nullable: false })
    precio_venta: number;

    @Column({ type: 'real', nullable: true })
    precio_oferta: number;

    @Column({ type: 'boolean', nullable: true, default: false })
    oferta: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    promocion: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    destacado: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    promocion_comercio: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    destacado_comercio: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    inicio: boolean;

    @Column({ type: 'boolean', default: true })
    disponible: boolean;

    @Column({ type: 'boolean', default: true })
    disponible_compra: boolean;

    @Column({ type: 'boolean', default: false })
    disponible_consulta: boolean;

    @Column({ type: 'boolean', default: false })
    archivado: boolean;

    @Column({ type: 'int', nullable: true })
    rebaja: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    sku: string;

    @Column({ type: 'int', nullable: true })
    ranking: number;

    @Column({ type: 'int', nullable: true })
    stock_actual: number;

    @ManyToOne((type) => Marcas, (marca) => marca.id)
    marcaId: Marcas;

    @ManyToOne((type) => Categorias, (cat) => cat.id)
    categoriaId: Categorias;

    @ManyToOne((type) => Comercios, (com) => com.productos)
    comercioId: Comercios;

    @OneToMany((type) => Opiniones, (ops) => ops.opinion)
    opinion: Opiniones[];

    @OneToMany((type) => Imagenes, (img) => img.producto)
    imagenes: Imagenes[];

    static getFilterAndPag(
        pageNro: number,
        pageSize: number,
        idMar: number,
        idCat: number,
        pmin: number,
        pmax: number,
    ) {
        const skipRecords = pageNro * pageSize;

        return this.createQueryBuilder('producto')
            .innerJoinAndSelect(
                'producto.marcaId',
                'marca',
                idMar ? `marca."id" = :idMar` : '1=1',
                { idMar },
            )
            .innerJoinAndSelect(
                'producto.categoriaId',
                'cat',
                idCat ? `cat."id" = :idCat` : '1=1',
                { idCat },
            )
            .leftJoinAndSelect('producto.comercioId', 'comercio')
            .leftJoinAndSelect('producto.imagenes', 'img')
            .andWhere(pmin ? `producto."precio_venta" >= :pmin` : '1=1', {
                pmin,
            })
            .andWhere(pmax ? `producto."precio_venta" <= :pmax` : '1=1', {
                pmax,
            })
            .orderBy('producto.id', 'DESC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

    static findByDescrip(descripcion: string) {
        return this.createQueryBuilder('producto')
            .leftJoinAndSelect('producto.marcaId', 'mar')
            .leftJoinAndSelect('producto.categoriaId', 'categ')
            .leftJoinAndSelect('producto.comercioId', 'comercio')
            .leftJoinAndSelect('producto.imagenes', 'img')
            .where('producto.descripcion = :descripcion', { descripcion })
            .orderBy('producto.id', 'DESC')
            .getMany();
    }

    static findPaginated(pageNro: number, pageSize: number) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando artículos..');
        return this.createQueryBuilder('producto')
            .leftJoinAndSelect('producto.marcaId', 'mar')
            .leftJoinAndSelect('producto.categoriaId', 'categ')
            .leftJoinAndSelect('producto.comercioId', 'comercio')
            .leftJoinAndSelect('producto.imagenes', 'img')
            .orderBy('producto.id', 'DESC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

    static findByTxtPaginated(
        pageNro: number,
        pageSize: number,
        attr: string,
        val: any,
    ) {
        const skipRecords = pageNro * pageSize;
        // attr = col descrip,nombre, etc..
        if (attr !== 'disponible') {
            console.log('Filtrando por Textos');
            return this.createQueryBuilder('producto')
                .leftJoinAndSelect('producto.marcaId', 'mar')
                .leftJoinAndSelect('producto.categoriaId', 'categ')
                .leftJoinAndSelect('producto.comercioId', 'comercio')
                .leftJoinAndSelect('producto.imagenes', 'img')
                .where(`LOWER(producto.${attr}) LIKE LOWER(:val)`, {
                    val: '%' + val + '%',
                })
                .orderBy('producto.id', 'DESC')
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        } else {
            console.log('Filtrando por disponibles');
            // si el atributo es disponible (Boolean)
            return this.createQueryBuilder('producto')
                .leftJoinAndSelect('producto.marcaId', 'mar')
                .leftJoinAndSelect('producto.categoriaId', 'categ')
                .leftJoinAndSelect('producto.comercioId', 'comercio')
                .leftJoinAndSelect('producto.imagenes', 'img')
                .where(`producto.disponible = :val`, { val })
                .orderBy('producto.id', 'DESC')
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        }
    }

    static getProductosPaginaComercio(
        pageNro: number,
        pageSize: number,
        idCom: number,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando x comercio');
        return this.createQueryBuilder('producto')
            .leftJoinAndSelect('producto.marcaId', 'mar')
            .leftJoinAndSelect('producto.categoriaId', 'categ')
            .leftJoinAndSelect('producto.comercioId', 'comercio')
            .leftJoinAndSelect('producto.imagenes', 'img')
            .where(`producto.comercioId = :idCom`, { idCom })
            .orderBy('producto.id', 'DESC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

    static getProductosPaginaCategoria(
        pageNro: number,
        pageSize: number,
        idCat: number,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Paginando x categoria');
        return this.createQueryBuilder('producto')
            .leftJoinAndSelect('producto.marcaId', 'mar')
            .leftJoinAndSelect('producto.categoriaId', 'categ')
            .leftJoinAndSelect('producto.comercioId', 'comercio')
            .leftJoinAndSelect('producto.imagenes', 'img')
            .where(`producto.categoriaId = :idCat`, { idCat })
            .orderBy('producto.id', 'DESC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }

    static getProductosPagComCat(
        pageNro: number,
        pageSize: number,
        idCom: number,
        idCat: number,
    ) {
        const skipRecords = pageNro * pageSize;
        console.log('Entity. Paginando x idComercio - idCategoria');
        return this.createQueryBuilder('producto')
            .leftJoinAndSelect('producto.marcaId', 'mar')
            .leftJoinAndSelect('producto.categoriaId', 'categ')
            .leftJoinAndSelect('producto.imagenes', 'img')
            .where(`producto.comercioId = :idCom`, { idCom })
            .andWhere(`producto.categoriaId = :idCat`, { idCat })
            .orderBy('producto.id', 'DESC')
            .skip(skipRecords)
            .take(pageSize)
            .getMany();
    }
}
