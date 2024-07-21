import { Productos } from '../Entities/Productos';
import { Request, Response } from 'express';
import { ImagenesController } from './imagenes.controller';
import { Imagenes } from '../Entities/Imagenes';
import * as faker from 'faker';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import { PedidosLineas } from '../Entities/PedidosLineas';
import { IMAGES_URL, SERVER_FILES_URL } from '../constants';

interface MulterRequest extends Request {
    file: any;
}

export class ProductosController {
    constructor() {}

    public ctl_Imagenes: ImagenesController = new ImagenesController();

    public async importProductosCSV(req: MulterRequest, res: Response) {
        let pathOfCvs: string = `${SERVER_FILES_URL}/${req.file.filename}`;
        let stream = fs.createReadStream(pathOfCvs);
        let csvData: Productos[] = [];

        let csvStream = fastcsv
            .parse({ delimiter: ';' })
            .on('error', (error) => console.error(error))
            .on('data', function (data) {
                csvData.push(data);
            })
            .on('end', async function () {
                csvData.shift(); // remove the first line: header
                console.log(csvData);
                res.send(csvData);
            });

        stream.pipe(csvStream);
    }

    public async postProductosCSV(req: MulterRequest, res: Response) {
        // let csvData: Productos[] = req.body.productos;

        let csvData: any[] = [
            [
                'PROBANDOSS',
                'SUBIENDO DESDE CSV',
                '1',
                '900',
                '',
                '2',
                '2',
                71,
                2,
            ],
            [
                'PROBANSSO',
                'SUBIENDO DESDE CSV',
                '1',
                '900',
                '850',
                '3',
                '3',
                70,
                2,
            ],
            [
                'PRUEBA',
                'SUBIENDO DESDE CSV',
                '1',
                '900',
                '850',
                '2',
                '1',
                69,
                2,
            ],
        ];
        console.log('csvData', [csvData]);
        // primero chequear los ids de los productos, que coincidan con los de cada comercio, sino abortar importacion

        let query =
            'INSERT INTO productos (nombre, descripcion, unidad, precio_venta, precio_oferta, marcaIdId, categoriaIdId, id, comercioIdId) VALUES ?';
        // + "ON DUPLICATE KEY UPDATE"
        // + "(nombre, descripcion, unidad, precio_venta, precio_oferta, marcaIdId, categoriaIdId, id, comercioIdId) = VALUES ?";

        Productos.query(query, csvData)
            .then((resp) => {
                res.send(resp);
                // console.log('res', res);
            })
            .catch((error) => res.send(error));
    }

    checkProdsBelongComercio() {
        // chequear si pertenenen al comercio
    }

    public async getFilterAndPag(req: Request, res: Response) {
        let idMar: any = req.query.idMarca;
        let idCat: any = req.query.idCategoria;
        let pmin: any = req.query.pMin;
        let pmax: any = req.query.pMax;
        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;

        await Productos.getFilterAndPag(
            pageNro,
            pageSize,
            idMar,
            idCat,
            pmin,
            pmax,
        )
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getCountProdsByComercio(req: Request, res: Response) {
        let idCom = parseInt(req.params.id);

        let cnt = await Productos.createQueryBuilder('productos')
            .where(`productos.comercioId = :idCom`, { idCom })
            .andWhere(`productos.archivado = :arch`, { arch: 0 }) // 0 = false
            .select('COUNT(*)', 'count')
            .getRawOne();
        res.send(cnt);
    }

    public async getProductosPaginaComercio(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let idCom: number = parseInt(req.params.id);

        await Productos.getProductosPaginaComercio(pageNro, pageSize, idCom)
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProductosPaginaCategoria(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let idCat: number = parseInt(req.params.id);

        await Productos.getProductosPaginaCategoria(pageNro, pageSize, idCat)
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProductosPagComCat(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let idCom: number = parseInt(req.params.idCom);
        let idCat: number = parseInt(req.params.idCat);
        console.log('idCat, idCom', idCat, idCom);

        console.log('Controller. Paginando x idComercio - idCategoria');

        await Productos.getProductosPagComCat(pageNro, pageSize, idCom, idCat)
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProductosPagina(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro || 0;
        let pageSize: any = req.query.pageSize;
        let filter: any = req.query.filter || '';
        let attr: any = req.query.attr || 'descripcion'; // columna por la cual filtrar
        console.log(req.query);
        if (filter === '') {
            await Productos.findPaginated(pageNro, pageSize)
                .then((productos: Productos[]) => {
                    for (let p of productos) {
                        delete p.comercioId.access_token;
                        delete p.comercioId.auth_code;
                        delete p.comercioId.refresh_token;
                        delete p.comercioId.last_update_token;
                    }
                    return productos;
                })
                .then((productos) => res.json(productos))
                .catch((err) => {
                    res.send(err);
                });
        } else {
            await Productos.findByTxtPaginated(pageNro, pageSize, attr, filter)
                .then((productos: Productos[]) => {
                    for (let p of productos) {
                        delete p.comercioId.access_token;
                        delete p.comercioId.auth_code;
                        delete p.comercioId.refresh_token;
                        delete p.comercioId.last_update_token;
                    }
                    return productos;
                })
                .then((productos) => res.json(productos))
                .catch((err) => {
                    res.send(err);
                });
        }
    }

    public createProductoFaker(req: Request, res: Response) {
        let producto: any = Productos.create(req.body);

        producto.categoria = req.body.categoria;
        producto.marca = req.body.marca;
        producto.nombre = faker.random.word();
        producto.descripcion = faker.random.word();
        producto.precio_venta = faker.random.number();
        producto.precio_oferta = faker.random.number();
        producto.precio_costo = faker.random.number();
        producto.destacado = faker.random.boolean();
        producto.oferta = faker.random.boolean();
        producto.destacado = faker.random.boolean();
        producto.inicio = faker.random.boolean();
        producto.stock_actual = faker.random.number();
        producto.sku = faker.random.word();
        producto.rebaja = faker.random.number();
        producto.disponible = faker.random.boolean();

        producto
            .save()
            .then((u) => {
                res.send(u);
            })
            .catch((err) => {
                res.send(err);
                console.log(err);
            });
    }

    // General
    // ==============================================================
    public async getProductos(req: Request, res: Response) {
        await Productos.find({
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let i of productos) {
                    delete i.comercioId.access_token;
                    delete i.comercioId.auth_code;
                    delete i.comercioId.refresh_token;
                    delete i.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProducto(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Productos.findOne(
            { id },
            { relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'] },
        )
            .then((producto) => {
                delete producto.comercioId.access_token;
                delete producto.comercioId.auth_code;
                delete producto.comercioId.refresh_token;
                delete producto.comercioId.last_update_token;

                res.json(producto);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProdsInicio(req: Request, res: Response) {
        await Productos.find({
            where: { inicio: true },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProdsDest(req: Request, res: Response) {
        await Productos.find({
            where: { destacado: true },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProdsProm(req: Request, res: Response) {
        await Productos.find({
            where: { promocion: true },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getByCat(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Productos.find({
            where: { categoriaId: id },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getByMar(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Productos.find({
            where: { marcaId: id },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    // Por Comercio
    // ==============================================================
    public async getProdsDestComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Productos.find({
            where: { comercioId: id, destacado_comercio: true },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProdsPromComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Productos.find({
            where: { comercioId: id, promocion_comercio: true },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getProdsByComercio(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Productos.find({
            where: { comercioId: id },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getByCatCom(req: Request, res: Response) {
        let idCat = parseInt(req.params.idCat);
        let idCom = parseInt(req.params.idCom);

        await Productos.find({
            where: { categoriaId: idCat, comercioId: idCom },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    public async getByCatMarCom(req: Request, res: Response) {
        let idCat = parseInt(req.params.idCat);
        let idCom = parseInt(req.params.idCom);
        let idMar = parseInt(req.params.idMar);
        await Productos.find({
            where: { categoriaId: idCat, comercioId: idCom, marcaId: idMar },
            order: { nombre: 'ASC' },
            relations: ['comercioId', 'marcaId', 'categoriaId', 'imagenes'],
        })
            .then((productos: Productos[]) => {
                for (let p of productos) {
                    delete p.comercioId.access_token;
                    delete p.comercioId.auth_code;
                    delete p.comercioId.refresh_token;
                    delete p.comercioId.last_update_token;
                }
                return productos;
            })
            .then((productos) => res.json(productos))
            .catch((err) => {
                res.send(err);
            });
    }

    // ==============================================================
    public createProducto(req: Request, res: Response) {
        let producto: Productos = new Productos();
        producto.nombre = req.body.nombre;
        producto.descripcion = req.body.descripcion;
        producto.categoriaId = req.body.categoriaId;
        producto.imagenes = req.body.imagenes;
        producto.marcaId = req.body.marcaId;
        producto.precio_venta = req.body.precio_venta;
        producto.precio_oferta = req.body.precio_oferta;
        producto.precio_costo = req.body.precio_costo;
        producto.destacado = req.body.destacado;
        producto.oferta = req.body.oferta;
        producto.inicio = req.body.inicio;
        producto.stock_actual = req.body.stock_actual;
        producto.ranking = req.body.ranking;
        producto.sku = req.body.sku;
        producto.rebaja = req.body.rebaja;
        producto.comercioId = req.body.comercioId;
        producto.opinion = req.body.opinion;
        producto.archivado = req.body.archivado;
        producto.disponible_consulta = req.body.disponible_consulta;
        producto.disponible_compra = req.body.disponible_compra;
        producto.disponible = req.body.disponible;
        producto.destacado_comercio = req.body.destacado_comercio;
        producto.promocion_comercio = req.body.promocion_comercio;
        producto.promocion = req.body.promocion;
        producto.disponible = req.body.disponible;
        producto.unidad = req.body.unidad;
        producto.peso = req.body.peso;
        producto.profundidad = req.body.profundidad;
        producto.alto = req.body.alto;
        producto.ancho = req.body.ancho;

        producto
            .save()
            .then((producto) => {
                res.json(producto);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public async createImgAndAssignToArt(req: MulterRequest, res: Response) {
        // Guardamos el ID del producto para luego buscarlo y asociarlo a la imagen
        let idArt: any = req.query.idArt;
        let idImg: number;
        let arrIdImagenes: any[] = [];
        let producto: Productos;

        console.log('idArt,', idArt);

        const img = new Imagenes();
        img.img_thumb = req.body.img_thumb;
        img.url = `${IMAGES_URL}/${req.file.filename} `; // Asignamos mismo nombre con el que se guardo el archivo

        // Creamos una imagen en la tabla de Imagenes
        await new Promise<void>((resolve, reject) => {
            console.log('Creamos una imagen en la tabla de Imagenes');
            img.save()
                .then((img) => {
                    idImg = img.id;
                    console.log('Se creo la img correctamente');
                    if (idArt) {
                        resolve();
                    } else {
                        res.json(img);
                    }
                })
                .catch((err) => {
                    res.json(err);
                    return reject(err);
                });
        });

        // Si se envió un id de producto, realizamos lo siguiente, sino, solo se carga la imagen
        if (idArt) {
            // Una vez creada la imagen, buscamos el producto
            await new Promise<void>((resolve, reject) => {
                console.log('Creada la imagen, buscamos el producto');
                Productos.findOne({ id: idArt }, { relations: ['imagenes'] })
                    .then((art) => {
                        console.log('Producto encontrado:', art);

                        producto = art;
                        resolve();
                    })
                    .catch((err) => {
                        res.json(err);
                        return reject(err);
                    });
            });

            // Si encuentra el producto, le asignamos la imagen
            await new Promise<void>((resolve, reject) => {
                console.log('Actualizando producto');
                arrIdImagenes = producto.imagenes;
                arrIdImagenes.push({ id: idImg });
                producto.imagenes = arrIdImagenes;

                producto
                    .save()
                    .then((producto) => {
                        console.log('Se editó el artículo con su imagen');
                        res.json(producto);
                        resolve();
                    })
                    .catch((err) => {
                        res.json(err);
                        return reject(err);
                    });
            });
        }
    }

    public updateProducto(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Productos.findOne({ id })
            .then((producto) => {
                producto.nombre = req.body.nombre;
                producto.descripcion = req.body.descripcion;
                producto.categoriaId = req.body.categoriaId;
                producto.imagenes = req.body.imagenes;
                producto.marcaId = req.body.marcaId;
                producto.precio_venta = req.body.precio_venta;
                producto.precio_oferta = req.body.precio_oferta;
                producto.precio_costo = req.body.precio_costo;
                producto.destacado = req.body.destacado;
                producto.oferta = req.body.oferta;
                producto.inicio = req.body.inicio;
                producto.stock_actual = req.body.stock_actual;
                producto.ranking = req.body.ranking;
                producto.sku = req.body.sku;
                producto.rebaja = req.body.rebaja;
                producto.comercioId = req.body.comercioId;
                producto.opinion = req.body.opinion;
                producto.archivado = req.body.archivado;
                producto.disponible_consulta = req.body.disponible_consulta;
                producto.disponible_compra = req.body.disponible_compra;
                producto.disponible = req.body.disponible;
                producto.destacado_comercio = req.body.destacado_comercio;
                producto.promocion_comercio = req.body.promocion_comercio;
                producto.promocion = req.body.promocion;
                producto.disponible = req.body.disponible;
                producto.unidad = req.body.unidad;
                producto.peso = req.body.peso;
                producto.profundidad = req.body.profundidad;
                producto.alto = req.body.alto;
                producto.ancho = req.body.ancho;
                producto
                    .save()
                    .then((producto) => {
                        res.json(producto);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    public updateStockProducto(prod: PedidosLineas) {
        let id = prod.id_prod;
        return new Promise((resolve) => {
            Productos.findOne({ id })
                .then((producto) => {
                    producto.stock_actual -= prod.cantidad;
                    producto
                        .save()
                        .then((resp) => {
                            console.log('Se actualizó el stock');
                            resolve(true);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    public deleteProducto(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Productos.findOne({ id })
            .then((producto) => {
                producto
                    .remove()
                    .then((producto) => {
                        res.json(producto);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    }
}
