import { Request, Response, NextFunction } from 'express';
import { ProductosController } from '../controllers/productos.controller';
import * as mw from './auth_mw';

export class ProductosRouter {
    public controlador: ProductosController = new ProductosController();

    public routes(app): void {
        app.route('/api/v1/productos')
            .get(this.controlador.getProductos)
            .post(mw.jwtComercianteMidleware, this.controlador.createProducto);

        app.route('/api/v1/producto/:id')
            .get(this.controlador.getProducto)
            .put(mw.jwtComercianteMidleware, this.controlador.updateProducto)
            .delete(
                mw.jwtComercianteMidleware,
                this.controlador.deleteProducto,
            );

        app.route('/api/v1/productos/destacados').get(
            this.controlador.getProdsDest,
        );

        app.route('/api/v1/productos/destacados/comercio/:id').get(
            this.controlador.getProdsDestComercio,
        );

        app.route('/api/v1/productos/promocion').get(
            this.controlador.getProdsProm,
        );

        app.route('/api/v1/productos/promocion/comercio/:id').get(
            this.controlador.getProdsPromComercio,
        );

        app.route('/api/v1/productos/inicio').get(
            this.controlador.getProdsInicio,
        );

        app.route('/api/v1/productos/comercio/:id').get(
            this.controlador.getProdsByComercio,
        );

        app.route('/api/v1/productos/categoria/:id').get(
            this.controlador.getByCat,
        );

        app.route('/api/v1/productos/categoria/:idCat/comercio/:idCom').get(
            this.controlador.getByCatCom,
        );

        app.route(
            '/api/v1/productos/categoria/:idCat/marca/:idMar/comercio/:idCom',
        ).get(this.controlador.getByCatMarCom);

        app.route('/api/v1/productos/marca/:id').get(this.controlador.getByMar);

        app.route('/api/v1/productos/filtrados').get(
            this.controlador.getFilterAndPag,
        );

        app.route('/api/v1/productos/count/comercio/:id').get(
            this.controlador.getCountProdsByComercio,
        );

        app.route('/api/v1/productos/paginado').get(
            this.controlador.getProductosPagina,
        );

        app.route('/api/v1/productos/paginado/comercio/:id').get(
            this.controlador.getProductosPaginaComercio,
        );

        app.route('/api/v1/productos/paginado/categoria/:id').get(
            this.controlador.getProductosPaginaCategoria,
        );

        app.route(
            '/api/v1/productos/paginado/comercio/:idCom/categoria/:idCat',
        ).get(this.controlador.getProductosPagComCat);

        app.route('/api/v1/productos/faker').post(
            mw.jwtAdminMidleware,
            this.controlador.createProductoFaker,
        );
    }
}
