import { Request, Response, NextFunction } from 'express';
import * as mw from './auth_mw';
import { MercadoPagoController } from '../controllers/mercado_pago.controller';

export class MercadoPagoRoutes {
    public controlador: MercadoPagoController = new MercadoPagoController();

    public routes(app): void {
        app.route('/api/v1/mercadopago/gencheckout').post(
            this.controlador.generarCheckOut,
        );
        app.route('/api/v1/mercadopago/adhesionmarketplace').get(
            this.controlador.AdhesionAlMarketplace,
        );
        app.route('/api/v1/mercadopago/success').get(
            this.controlador.successPayment,
        );

        app.route('/api/v1/mercadopago/pending').get(
            this.controlador.pendingPayment,
        );
        app.route('/api/v1/mercadopago/failure').get(
            this.controlador.failurePayment,
        );
        // app.route('/api/v1/mercadopago/saveaccesstoken')
        //     .get(this.controlador.AdhesionAlMarketplace);
        app.route('/api/v1/mercadopago/notificationipn').post(
            this.controlador.notificacionesIPN,
        );
    }
}
